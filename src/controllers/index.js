import { getIndex, productForm, saveProd, getProduct, getByCategory } from './products.controller.js'
import { addToCart, cart, buyCart, resetCart } from './cart.controller.js';
import { login, register, info, logout, failLogin, failRegister } from './users.controller.js';
import { getChat, getUserChat } from './chat.controller.js'

const unknownRoute = ( req, res )=>{
    res.status(404).send("Sorry this route does not exist")
}

export const controller = {
    getIndex,
    login,
    register,
    info,
    failLogin,
    failRegister,
    productForm,
    saveProd,
    getProduct,
    unknownRoute,
    addToCart,
    logout,
    cart,
    buyCart,
    resetCart,
    getChat,
    getUserChat,
    getByCategory,
}