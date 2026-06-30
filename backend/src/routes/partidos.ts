import { Router } from 'express'
import { getInfoPartidos } from '../controllers/partidosController'
import { getPartidosxDia } from '../controllers/partidosController'
import { editarPartido } from '../controllers/partidosController'
import { getPrediccionesPartido } from '../controllers/partidosController'
import { getBracket } from '../controllers/partidosController'

const router = Router()

router.get('/', getInfoPartidos)

router.get('/partidosxdia', getPartidosxDia)

router.get('/getBracket', getBracket)

router.get('/:id/predicciones', getPrediccionesPartido)

router.put('/:id', editarPartido)

export default router