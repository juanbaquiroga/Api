import CustomError from "../classes/CustomError.class.js";
import DAO from "../classes/DAO.class.js";
import Cart from "../models/cart.model.js";


export default class ProductsMongoDao extends DAO {
    constructor() {
        super();
        this.collection = Cart;
    }
    
    async create(createCartRequest) {
        try {
            const createCart = await this.collection.create(createCartRequest);
        
            return createCart;
        } catch (err) {
            throw new CustomError(500, "Error creating cart");
        }
    }

    async push(username, product){
        try {
            await this.collection.updateOne(
                {username: username},
                { $push: { products: product } }
            )

            return;
        } catch (err) {
            throw new CustomError(500, "Error pushing product to cart");
        }
    }
    async update(username, updateCartRequest){
        try {
            await this.collection.updateOne(
                {username: username},
                updateCartRequest
            )
        }catch(err){
            throw new CustomError(500, 'error updating cart')
        }
    }

    async reset(username){ 
        try {
            await this.collection.updateOne(
                {username: username},
                { $set: { products: [] } }
            )
            return;
        }
        catch (err) {
            throw new CustomError(500, "Error deleting cart");
        }
    }
    async getOne(filters){
        try {
            const cart = await this.collection.findOne(filters);
        
            return cart;
        } catch (err) {
            throw new CustomError(500, "Error getting cart");
        }
    }
}
