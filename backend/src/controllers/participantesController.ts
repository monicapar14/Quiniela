import { Request, Response } from 'express'
import pool from '../db'

//obtener puntajes de los participantes
export const getinfoParticipante = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`SELECT a.id AS id_p, a.nombre, b.puntos_totales
                                      FROM participantes a
                                      LEFT JOIN ranking b 
                                          ON a.id = b.participante_id`)
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener los participantes:', error)
    res.status(500).json({ message: 'Error al obtener los participantes' })
  }
}

//obtener ranking de los participantes
export const getRanking = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`SELECT a.id, a.nombre, b.puntos_totales, b.exactos_totales
                                      FROM participantes a, ranking b
                                      WHERE a.id = b.participante_id
                                      ORDER BY b.puntos_totales DESC, b.exactos_totales DESC`)
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener el ranking:', error)
    res.status(500).json({ message: 'Error al obtener el ranking' })
  }
}
