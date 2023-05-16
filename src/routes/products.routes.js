import Router from 'express'
import { controller } from '../controllers/index.js';
import { productValidations } from '../validations/index.js';

const router =  Router()

router.route('/').get(controller.getIndex)
router.route('/add').get(controller.productForm).post(productValidations.createProductValidations, controller.saveProd)
router.route('/:id').get(controller.getProduct)
router.route('/category/:category').get(controller.getByCategory)

export default router;