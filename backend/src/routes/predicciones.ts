import { Router } from 'express'
import { editarPrediccion } from "../controllers/prediccionesController";
import { getPrediccionesParticipante } from '../controllers/prediccionesController';
import { finales } from "../controllers/prediccionesController";

const router = Router()

router.get("/finales", finales);

router.get('/participante/:id', getPrediccionesParticipante);

router.put("/:id", editarPrediccion);

export default router