import { Request, Response } from 'express';
import pool from '../db';

const calcularPuntos = (
    realLocal: number,
    realVisitante: number,
    predLocal: number,
    predVisitante: number
) => {

    if (
        realLocal === predLocal &&
        realVisitante === predVisitante
    ) {
        return {
            puntos: 3,
            exacto: true
        };
    }

    const resultadoReal =
        realLocal > realVisitante
            ? 'L'
            : realLocal < realVisitante
            ? 'V'
            : 'E';

    const resultadoPred =
        predLocal > predVisitante
            ? 'L'
            : predLocal < predVisitante
            ? 'V'
            : 'E';

    const unMarcador =
        realLocal === predLocal ||
        realVisitante === predVisitante;

    if (
        resultadoReal === resultadoPred &&
        unMarcador
    ) {
        return {
            puntos: 2,
            exacto: false
        };
    }

    if (resultadoReal === resultadoPred) {
        return {
            puntos: 1,
            exacto: false
        };
    }

    if (unMarcador) {
        return {
            puntos: 1,
            exacto: false
        };
    }

    return {
        puntos: 0,
        exacto: false
    };
};

export const editarPrediccion = async ( req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const {
            pred_goles_local,
            pred_goles_visitante,
            partido_id
        } = req.body;

        /*
        ===========================
        Insertar o actualizar predicción
        ===========================
        */

        await pool.query(
            `
            INSERT INTO predicciones
            (
                participante_id,
                partido_id,
                pred_goles_local,
                pred_goles_visitante
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?
            )
            ON DUPLICATE KEY UPDATE
                pred_goles_local = VALUES(pred_goles_local),
                pred_goles_visitante = VALUES(pred_goles_visitante)
            `,
            [
                id,
                partido_id,
                pred_goles_local,
                pred_goles_visitante
            ]
        );

        /*
        ===========================
        Obtener la predicción
        ===========================
        */

        const [predicciones]: any =
            await pool.query(
                `
                SELECT
                    participante_id,
                    partido_id
                FROM predicciones
                WHERE participante_id=?
                    AND partido_id = ?
                `,
                [id, partido_id]
            );

        const prediccion =
            predicciones[0];

        /*
        ===========================
        Obtener resultado real
        ===========================
        */

        const [partidos]: any =
            await pool.query(
                `
                SELECT
                    goles_local,
                    goles_visitante
                FROM partidos
                WHERE id=?
                `,
                [
                    prediccion.partido_id
                ]
            );

        if (
            partidos.length > 0 &&
            partidos[0]
                .goles_local !== null &&
            partidos[0]
                .goles_visitante !== null
        ) {

            const partido =
                partidos[0];

            const resultado =
                calcularPuntos(
                    partido.goles_local,
                    partido.goles_visitante,
                    Number(
                        pred_goles_local
                    ),
                    Number(
                        pred_goles_visitante
                    )
                );

            await pool.query(
                `
                INSERT INTO
                puntajes_partido
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
                ON DUPLICATE KEY
                UPDATE
                    puntos=
                    VALUES(puntos)
                `,
                [
                    prediccion
                        .participante_id,
                    prediccion
                        .partido_id,
                    resultado.puntos
                ]
            );

            await pool.query(
                `
                INSERT INTO
                marcadores_acertados
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
                ON DUPLICATE KEY
                UPDATE
                    acerto_exacto=
                    VALUES(
                        acerto_exacto
                    )
                `,
                [
                    prediccion
                        .participante_id,
                    prediccion
                        .partido_id,
                    resultado.exacto
                ]
            );

            const [puntos]: any =
                await pool.query(
                    `
                    SELECT
                        IFNULL(
                            SUM(puntos),
                            0
                        ) total
                    FROM puntajes_partido
                    WHERE participante_id=?
                    `,
                    [
                        prediccion
                            .participante_id
                    ]
                );

            const [exactos]: any =
                await pool.query(
                    `
                    SELECT
                        COUNT(*) total
                    FROM
                    marcadores_acertados
                    WHERE
                        participante_id=?
                    AND
                        acerto_exacto=TRUE
                    `,
                    [
                        prediccion
                            .participante_id
                    ]
                );

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
                ON DUPLICATE KEY
                UPDATE
                    puntos_totales=
                    VALUES(
                        puntos_totales
                    ),
                    exactos_totales=
                    VALUES(
                        exactos_totales
                    )
                `,
                [
                    prediccion
                        .participante_id,
                    puntos[0].total,
                    exactos[0].total
                ]
            );
        }

        res.json({
            message:
                'Predicción actualizada'
        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                'Error al actualizar'
        });

    }
};

export const getPrediccionesParticipante = async (
    req: Request,
    res: Response
) => {

    try {

        const { id } = req.params;

        const [rows] = await pool.query(
            `
            SELECT
                pa.nombre,
                p.id AS partido_id,
                p.equipo_local,
                p.equipo_visitante,
                p.goles_local,
                p.goles_visitante,
                pr.pred_goles_local,
                pr.pred_goles_visitante,
                IFNULL(pp.puntos,0) AS puntos
            FROM predicciones pr
            INNER JOIN partidos p
                ON p.id = pr.partido_id
            INNER JOIN participantes pa
                ON pa.id = pr.participante_id
            LEFT JOIN puntajes_partido pp
                ON pp.participante_id =
                    pr.participante_id
                AND pp.partido_id =
                    pr.partido_id
            WHERE pr.participante_id = ?
            ORDER BY p.fecha ASC
            `,
            [id]
        );

        res.json(rows);

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                'Error al obtener predicciones'
        });

    }
};