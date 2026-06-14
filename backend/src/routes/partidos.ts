import { Router } from 'express'
import { getInfoPartidos } from '../controllers/partidosController'
import { getPartidosxDia } from '../controllers/partidosController'
/*import { agregarProducto } from '../controllers/partidosController'
import { getProductosById } from '../controllers/partidosController'
import { updateProductos } from '../controllers/partidosController'*/

const router = Router()

router.get('/', getInfoPartidos)

router.get('/partidosxdia', getPartidosxDia)

/*router.post('/agregarProducto', agregarProducto)

router.get('/:id', getProductosById)

router.post('/updateProductos', updateProductos)*/

export default router