import Router from 'express';
import usersRouter from './user.routes.js';
import chatRouter from './chat.routes.js';
import productsRouter from './products.routes.js';
import cartRouter from './cart.routes.js';

const router =  Router()

router.use('/user', usersRouter)
router.use('/chat', chatRouter)
router.use('/products', productsRouter)
router.use('/cart', cartRouter)

export default router;