import CustomError from "../classes/CustomError.class.js";
import DAO from "../classes/DAO.class.js";
import { User } from "../models/index.js";

export default class UserMongoDao extends DAO {
    constructor() {
        super();
        this.collection = User;
    }
    
    async create(createUserRequest) {
        try {
            const createdUser = await this.collection.create(createUserRequest);
            return createdUser;
        } catch (err) {
            throw new CustomError(500, "Error creating user");
        }
    }
    async deleteOne(userId){
        try {
            await this.collection.deleteOne({_id: userId});
        }catch(err){
            throw new CustomError(500, "error deletting user")
        }
    }
    async getOne(filter){
        try {
            const user = await this.collection.findOne(filter);
            
            return user
        } catch (err) {
            throw new CustomError(500, "Error getting user");
        }
    }

}
