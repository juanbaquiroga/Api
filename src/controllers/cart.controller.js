import { productService, cartService } from '../services/index.js'
import { createTransport } from "nodemailer";
import logger from '../libs/logger.lib.js';

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'molly.ebert@ethereal.email',
        pass: 'R5eUKPutHVvRZ6KBAB'
    }
});
  
const addToCart = async (req, res)=>{
    try{
        const productId = req.body.prodId
        const product = await productService.findProductById(productId)
        const username = req.user.username
        const cart = await cartService.findCartByFilter(username)

        if (cart.products.some(item => item.name === product.name)) {
            cart.products.find(item => item.name === product.name).qty++
        }
        else {
            cart.products.push({
                name: product.name,
                qty: 1,
                price: product.price,
                stock: product.stock,
                img: product.img,
                _id: product._id
            });
        }
        await cartService.updateCart(username, cart)
        res.redirect('/products')
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
const cart = async (req, res, next) => {
    try{
        const user = req.user
        const cart = await cartService.findCartByFilter(user.username);
        const products = cart.products
        res.render("cart", {products, hasAny:true, username: user.username, userImg:user.img})
    } catch (err){
        next(err)
    }
}
const buyCart = async (req, res) =>{
    const user = req.user
    const cart = await cartService.findCartByFilter(user.username);
    const mailOtions = {
        from: "Servidor Node",
        to: "molly.ebert@ethereal.email",
        subject: `nuevo pedido de ${user.username}`,
        text:`email: ${user.email} \nusername: ${user.username} \nbuy(\n${cart.products.map((prod)=>{
            return `    - product: ${prod.name}, price per unit: $${prod.price}, quantity: ${prod.qty}\n`
        })})`
    };
    
    await cartService.resetCart(user.username)
    try {
        await transporter.sendMail(mailOtions);
    } catch (err) {
        logger.error(err);
    }
    res.redirect('/cart')
}
const resetCart = async (req, res)=>{
    const user = req.user
    const cart = await cartService.findCartByFilter(user.username);
    if(!cart){
        res.status(404).json({message: "no existe el carrito"})
    }
    await cartService.resetCart(user.username)
    res.redirect('/cart')
}


export { addToCart, cart, buyCart, resetCart }
