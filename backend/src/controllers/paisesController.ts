import { Request, Response } from 'express';
import { RowDataPacket } from "mysql2";
import pool from '../db';

interface PuntajeFinal extends RowDataPacket {
    participante_id: number;
    puntos: number;
}

export const obtenerPaisesPodio = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(`SELECT id, nombre, lugar, puede_ser_primero,
                                                puede_ser_segundo, puede_ser_tercero
                                            FROM paises
                                            WHERE activo = TRUE`);

        res.json(rows);

    } catch (error) {
        console.error("Error al obtener países del podio:", error);
        res.status(500).json({
            message: "Error al obtener países del podio"
        });
    }
};

export const guardarPodio = async (req: Request, res: Response) => {

    const connection = await pool.getConnection();

    try {

        const {
            primerLugar,
            segundoLugar,
            tercerLugar
        } = req.body;

        await connection.beginTransaction();

        // PRIMER LUGAR
        if (primerLugar !== undefined) {

            await connection.query(`
                UPDATE paises
                SET lugar = NULL
                WHERE lugar = 1
            `);

            if (primerLugar !== null) {

                await connection.query(`
                    UPDATE paises
                    SET lugar = 1
                    WHERE id = ?
                `, [primerLugar]);

            }

        }

        // SEGUNDO LUGAR
        if (segundoLugar !== undefined) {

            await connection.query(`
                UPDATE paises
                SET lugar = NULL
                WHERE lugar = 2
            `);

            if (segundoLugar !== null) {

                await connection.query(`
                    UPDATE paises
                    SET lugar = 2
                    WHERE id = ?
                `, [segundoLugar]);

            }

        }

        // TERCER LUGAR
        if (tercerLugar !== undefined) {

            await connection.query(`
                UPDATE paises
                SET lugar = NULL
                WHERE lugar = 3
            `);

            if (tercerLugar !== null) {

                await connection.query(`
                    UPDATE paises
                    SET lugar = 3
                    WHERE id = ?
                `, [tercerLugar]);

            }

        }        

        // ================= PRIMER LUGAR =================
        if (primerLugar !== undefined && primerLugar !== null) {

            const [puntajes] = await connection.query<PuntajeFinal[]>(`
                SELECT
                    pf.participante_id,
                    CASE
                        WHEN p1.lugar = 1 THEN 10
                        ELSE 0
                    END AS puntos
                FROM predicciones_finales pf
                LEFT JOIN paises p1
                    ON p1.id = pf.primer_lugar_id
            `);

            for (const puntaje of puntajes) {

                if (puntaje.puntos > 0) {

                    await connection.query(`
                        UPDATE ranking
                        SET puntos_totales = puntos_totales + ?
                        WHERE participante_id = ?
                    `,
                    [
                        puntaje.puntos,
                        puntaje.participante_id
                    ]);

                }

            }

        }

        // ================= SEGUNDO LUGAR =================
        if (segundoLugar !== undefined && segundoLugar !== null) {

            const [puntajes] = await connection.query<PuntajeFinal[]>(`
                SELECT
                    pf.participante_id,
                    CASE
                        WHEN p2.lugar = 2 THEN 8
                        ELSE 0
                    END AS puntos
                FROM predicciones_finales pf
                LEFT JOIN paises p2
                    ON p2.id = pf.segundo_lugar_id
            `);

            for (const puntaje of puntajes) {

                if (puntaje.puntos > 0) {

                    await connection.query(`
                        UPDATE ranking
                        SET puntos_totales = puntos_totales + ?
                        WHERE participante_id = ?
                    `,
                    [
                        puntaje.puntos,
                        puntaje.participante_id
                    ]);

                }

            }

        }

        // ================= TERCER LUGAR =================
        if (tercerLugar !== undefined && tercerLugar !== null) {

            const [puntajes] = await connection.query<PuntajeFinal[]>(`
                SELECT
                    pf.participante_id,
                    CASE
                        WHEN p3.lugar = 3 THEN 5
                        ELSE 0
                    END AS puntos
                FROM predicciones_finales pf
                LEFT JOIN paises p3
                    ON p3.id = pf.tercer_lugar_id
            `);

            for (const puntaje of puntajes) {

                if (puntaje.puntos > 0) {

                    await connection.query(`
                        UPDATE ranking
                        SET puntos_totales = puntos_totales + ?
                        WHERE participante_id = ?
                    `,
                    [
                        puntaje.puntos,
                        puntaje.participante_id
                    ]);

                }

            }

        }

        await connection.commit();

        res.json({
            message: "Podio actualizado correctamente"
        });

    } catch (error) {

        await connection.rollback();

        console.error("Error guardando podio:", error);

        res.status(500).json({
            message: "Error guardando podio"
        });

    } finally {

        connection.release();

    }

};