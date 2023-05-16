import CustomError from "../classes/CustomError.class.js";
import DAO from "../classes/DAO.class.js";
import { Product } from "../models/index.js";

export default class ProductsMongoDao extends DAO {
  constructor() {
    super();
    this.collection = Product;
  }
    
    async create(createProductRequest) {
        try {
            const createdProduct = await this.collection.create(createProductRequest);
            return createdProduct;
        } catch (err) {
            throw new CustomError(500, "Error creating product");
          }
    }

    async getById(id){
        try {
            const product = await this.collection.findOne({_id:id}).lean();
        
            return product;
        } catch (err) {
            throw new CustomError(500, "Error getting product");
        }
    }
    async getByName(name){
        try {
            const product = await this.collection.findOne({name});
        
            return product;
        } catch (err) {
            throw new CustomError(500, "Error getting product");
        }
    }
    async getByCategory(category){
        try {
            const products = await this.collection.find({category}).lean();
        
            return products;
        } catch (err) {
            throw new CustomError(500, "Error getting products");
        }
    }
    async deleteOne(id){
        try {
            const deletedProduct = await this.collection.deleteOne({ _id: id });
        
            return deletedProduct;
        } catch (err) {
            throw new CustomError(500, "Error deleting product");
        }
    }
    async getAll() {
        try {
            const products = await this.collection.find().lean();

            return products
        } catch (err) {
            throw new CustomError(500, "Error getting products");
        }
    }
    async deleteAll(){
        try {
            const deletedProducts = await this.collection.deleteMany()
        }catch(err){
            throw new CustomError(500, "Error deleting products");
        }
    }
}
