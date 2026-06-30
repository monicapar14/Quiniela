import { Request, Response } from 'express'
import pool from '../db'

//obtener toda la informacion de los partidos
export const getInfoPartidos = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`SELECT b.id, a.nombre as grup_nom, f.nombre as fase_nom, b.equipo_local, b.equipo_visitante, 
                                            b.fecha, b.goles_local, b.goles_visitante, b.fase_id,
                                            CASE
                                                WHEN b.goles_local = b.goles_visitante
                                                    AND b.fase_id <> 1
                                                THEN b.ganador
                                                ELSE NULL
                                            END AS ganador
	                                      FROM grupos a, partidos b
                                        JOIN fases f ON f.id = b.fase_id
                                        WHERE a.id = b.grupo_id
                                    order by b.fase_id asc, b.fecha asc`)
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    res.status(500).json({ message: 'Error al obtener los productos' })
  }
}

//obtener toda la informacion de los partidos por día
export const getPartidosxDia = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`SELECT b.id, a.nombre as grup_nom, b.equipo_local, b.equipo_visitante, 
                                            b.fecha, b.goles_local, b.goles_visitante, b.fase_id,
                                            CASE
                                                WHEN b.goles_local = b.goles_visitante
                                                    AND b.fase_id <> 1
                                                THEN b.ganador
                                                ELSE NULL
                                            END AS ganador
	                                      FROM grupos a, partidos b
                                        WHERE a.id = b.grupo_id
                                          AND DATE(CONVERT_TZ(b.fecha, '+00:00', '-06:00')) = DATE(CONVERT_TZ(SYSDATE(), '+00:00', '-06:00'))
                                    order by fecha asc`)
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    res.status(500).json({ message: 'Error al obtener los productos' })
  }
}

//Calcular puntos
const calcularPuntos = (
  realLocal: number,
  realVisitante: number,
  predLocal: number,
  predVisitante: number
) => {

  // Marcador exacto
  if ((realLocal === predLocal) && (realVisitante === predVisitante)) {
    return {puntos: 3, exacto: true}
  }

  const resultadoReal =
    realLocal > realVisitante
      ? 'L'
      : realLocal < realVisitante
      ? 'V'
      : 'E'

  const resultadoPred =
    predLocal > predVisitante
      ? 'L'
      : predLocal < predVisitante
      ? 'V'
      : 'E'

  const unMarcador =
    realLocal === predLocal ||
    realVisitante === predVisitante

  // acertó resultado y un marcador
  if ((resultadoReal === resultadoPred) && (unMarcador)) {
    return {puntos: 2,exacto: false}
  }

  // solo acertó ganador o empate
  if (resultadoReal === resultadoPred) {
    return {puntos: 1, exacto: false}
  }

  // solo acertó un marcador
  if (unMarcador) {
    return {puntos: 1, exacto: false}
  }

  return {puntos: 0, exacto: false}
}

//Recalcular puntos del partido
const recalcularPartido = async (
  partidoId: number
) => {

  const [partidos]: any = await pool.query(`SELECT goles_local, goles_visitante
                                              FROM partidos
                                              WHERE id = ?`,
    [partidoId]
  )

  if (partidos.length === 0) {
    return
  }

  const partido = partidos[0]

  if (
    partido.goles_local === null ||
    partido.goles_visitante === null
  ) {

    await pool.query(
      `DELETE FROM puntajes_partido
        WHERE partido_id = ?`,
      [partidoId]
    )

    await pool.query(
      `DELETE FROM marcadores_acertados
        WHERE partido_id = ?`,
      [partidoId]
    )

    // Recalcular ranking completo
    const [participantes]: any =
      await pool.query(`
        SELECT id
        FROM participantes
      `)

    for (const participante of participantes) {

      const [puntos]: any =
        await pool.query(
          `
          SELECT IFNULL(SUM(puntos),0) total
          FROM puntajes_partido
          WHERE participante_id = ?
          `,
          [participante.id]
        )

      const [exactos]: any =
        await pool.query(
          `
          SELECT COUNT(*) total
          FROM marcadores_acertados
          WHERE participante_id = ?
          AND acerto_exacto = TRUE
          `,
          [participante.id]
        )

      await pool.query(
        `
        INSERT INTO ranking
        (
          participante_id,
          puntos_totales,
          exactos_totales
        )
        VALUES
        (
          ?,
          ?,
          ?
        )
        ON DUPLICATE KEY UPDATE
          puntos_totales = VALUES(puntos_totales),
          exactos_totales = VALUES(exactos_totales)
        `,
        [
          participante.id,
          puntos[0].total,
          exactos[0].total
        ]
      )
    }

    return
  }

  const [predicciones]: any = await pool.query(`SELECT *
                                                  FROM predicciones
                                                  WHERE partido_id = ?`,
    [partidoId]
  )

  for (const pred of predicciones) {

    const resultado = calcularPuntos(
      partido.goles_local,
      partido.goles_visitante,
      pred.pred_goles_local,
      pred.pred_goles_visitante
    )

    /* ===========================
       puntajes_partido
    ============================ */

    await pool.query(
      `
        INSERT INTO puntajes_partido
        (
          participante_id,
          partido_id,
          puntos
        )
        VALUES
        (
          ?,
          ?,
          ?
        )
        ON DUPLICATE KEY UPDATE
          puntos = VALUES(puntos)
      `,
      [
        pred.participante_id,
        partidoId,
        resultado.puntos
      ]
    )

    /* ===========================
       marcadores_acertados
    ============================ */

    await pool.query(
      `
        INSERT INTO marcadores_acertados
        (
          participante_id,
          partido_id,
          acerto_exacto
        )
        VALUES
        (
          ?,
          ?,
          ?
        )
        ON DUPLICATE KEY UPDATE
          acerto_exacto =
          VALUES(acerto_exacto)
      `,
      [
        pred.participante_id,
        partidoId,
        resultado.exacto
      ]
    )
  }

  /* ===========================
     RECALCULAR RANKING
  ============================ */

  const [participantes]: any =
    await pool.query(`
      SELECT id
      FROM participantes
    `)

  for (const participante of participantes) {

    const [puntos]: any =
      await pool.query(
        `
          SELECT
            IFNULL(SUM(puntos),0)
            AS total
          FROM puntajes_partido
          WHERE participante_id = ?
        `,
        [participante.id]
      )

    const [exactos]: any =
      await pool.query(
        `
          SELECT
            COUNT(*) AS total
          FROM marcadores_acertados
          WHERE participante_id = ?
          AND acerto_exacto = TRUE
        `,
        [participante.id]
      )

    await pool.query(
      `
        INSERT INTO ranking
        (
          participante_id,
          puntos_totales,
          exactos_totales
        )
        VALUES
        (
          ?,
          ?,
          ?
        )
        ON DUPLICATE KEY UPDATE
          puntos_totales =
            VALUES(puntos_totales),
          exactos_totales =
            VALUES(exactos_totales)
      `,
      [
        participante.id,
        puntos[0].total,
        exactos[0].total
      ]
    )
  }
}

//Editar puntos del partido
export const editarPartido = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params

    const {
      goles_local,
      goles_visitante,
      ganador
    } = req.body

    await pool.query(`UPDATE partidos
                        SET goles_local = ?,
                            goles_visitante = ?,
                            ganador = ?
                        WHERE id = ?`,
      [
        goles_local ?? null,
        goles_visitante ?? null,
        ganador ?? null,
        id
      ]
    )

    await recalcularPartido(
      Number(id)
    )

    res.json({
      message:
        'Partido actualizado correctamente'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message:
        'Error al actualizar el partido'
    })
  }
}

export const getPrediccionesPartido = async (
  req: Request,
  res: Response
) => {
  try {
    
    const id = Number(req.params.id);

    const [rows] = await pool.query(`SELECT a.id, a.nombre, ? as partido_id, b.pred_goles_local, b.pred_goles_visitante
                                       FROM participantes a
                                       LEFT JOIN predicciones b 
                                         ON a.id = b.participante_id 
                                         AND b.partido_id = ?
                                     ORDER BY a.id`,
      [id, id]
    );

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        'Error al obtener predicciones'
    });

  }
};

export const getBracket = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        b.id,
        f.nombre as fase_nom,
        b.equipo_local,
        b.equipo_visitante,
        b.fecha,
        b.goles_local,
        b.goles_visitante,
        b.fase_id,
        CASE
          WHEN b.goles_local = b.goles_visitante
            AND b.fase_id <> 1
          THEN b.ganador
          ELSE NULL
        END AS ganador
      FROM partidos b
      JOIN fases f ON f.id = b.fase_id
      ORDER BY b.fase_id ASC, b.fecha ASC
    `)

    const partidos = rows as any[]

    const fases: Record<number, any> = {}

    partidos.forEach((p) => {
      if (!fases[p.fase_id]) {
        fases[p.fase_id] = {
          id: p.fase_id,
          nombre: p.fase_nom,
          partidos: []
        }
      }

      fases[p.fase_id].partidos.push(p)
    })

    res.json(Object.values(fases))
  } catch (error) {
    console.error('Error al obtener bracket:', error)
    res.status(500).json({ message: 'Error al obtener bracket' })
  }
}