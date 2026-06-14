import { Router } from 'express'
import { getinfoParticipante } from '../controllers/participantesController'
import { getRanking } from '../controllers/participantesController'
/*import { agregarServicio } from '../controllers/participantesController'
import { getServiciosById } from '../controllers/participantesController'
import { updateServicios } from '../controllers/participantesController'*/

const router = Router()

router.get('/', getinfoParticipante)

router.get('/getRanking', getRanking)

/*router.post('/agregarServicio', agregarServicio)

router.get('/:id', getServiciosById)

router.post('/updateServicios', updateServicios)*/

export default router