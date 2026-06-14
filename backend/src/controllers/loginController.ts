import { Request, Response } from 'express'
import pool from '../db'
import bcrypt from "bcryptjs";

//hacer login
export const login = async (req: Request, res: Response) => {
    const { nombre, password } = req.body;

    const [rows]: any = await pool.query(
        "SELECT * FROM usuarios WHERE nombre=?",
        [nombre]
    );

    if(rows.length === 0){
        return res.status(401).json({
            message:"Credenciales incorrectas"
        });
    }

    const usuario = rows[0];

    const valido = await bcrypt.compare(
        password,
        usuario.password_hash
    );

    if(!valido){
        return res.status(401).json({
            message:"Credenciales incorrectas"
        });
    }

    res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
    });
};