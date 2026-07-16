import { Router } from 'express'
import { obtenerPaisesPodio } from "../controllers/paisesController";
import { guardarPodio } from "../controllers/paisesController";

const router = Router()

router.get("/podio", obtenerPaisesPodio);

router.put("/podio", guardarPodio);

export default router