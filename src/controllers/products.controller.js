import { productService } from '../services/index.js'

const getIndex = async (req, res, next)=>{
    try {
        const user = req.user
        const products = await productService.findAllProducts();
        const categories = []
        products.forEach((product)=>{
            const category = product.category;
            if (!categories.includes(category)) {
              categories.push(category);
            }
        })
        res.render('home', {products, categories, username: user.username, userImg:user.img, admin: user.admin})
    } catch (err) {
        next(err);
    }
}
const getProduct = async (req, res, next)=>{
    try {
        const {id} = req.params
        const product = await productService.findProductById(id);
        const user = req.user
        if(product){
            res.render('product', {product, username: user.username, userImg:user.img})
        }else{
            res.status(404).send('Product not found')
        }
    } catch (err) {
        next(err);
    }
}

const getByCategory = async (req, res, next)=>{
    try {
        const {category} = req.params
        const products = await productService.findProductsByCategory(category);
        const user = req.user
        if(products){
            res.render('category', {products,  category, username: user.username, userImg:user.img})
        }else{
            res.status(404).send('Products not found')
        }
    } catch (err) {
        next(err);
    }
}

const productForm = (req, res, next)=>{
    try {
        res.render('product-form')
    } catch (err) {
        next(err)
    }
}
const saveProd = (req, res, next)=>{
    try {
    const {name, price, stock, img, category} = req.body;
    productService.createProduct({ name, price, stock, img, category})

    res.redirect('/products')
    } catch (err) {
        next(err)
    }
}


export {getIndex, productForm, saveProd, getProduct, getByCategory }