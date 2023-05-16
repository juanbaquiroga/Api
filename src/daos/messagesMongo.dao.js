import CustomError from "../classes/CustomError.class.js";
import DAO from "../classes/DAO.class.js";
import { Message } from "../models/index.js";

export default class MessagesMongoDao extends DAO {
    constructor() {
        super();
        this.collection = Message;
    }
    
    async create(createMessageRequest) {
        try {
            const createdMessage = await this.collection.create(createMessageRequest);

            return createdMessage;
        } catch (err) {
            throw new CustomError(500, "Error creating message");
        }
    }
    async getById(id){
        try {
            const message = await this.collection.findOne({_id:id});
        
            return message;
        } catch (err) {
            throw new CustomError(500, "Error getting message");
        }
    }
    async deleteOne(id){
        try {
            const deletedMessage = await this.collection.deleteOne({ _id: id });
        
            return deletedMessage;
        } catch (err) {
            throw new CustomError(500, "Error deleting message");
        }
    }
    async getAll() {
        try {
            const messages = await this.collection.find().lean();

            return messages
        } catch (err) {
            throw new CustomError(500, "Error getting messages");
        }
    }
    async getMany(username) {
        try {
            const messages = await this.collection.find({username}).lean();

            return messages
        } catch (err) {
            throw new CustomError(500, "Error getting messages");
        }
    }
    async deleteAll(){
        try {
            const deletedMessages = await this.collection.deleteMany()
            return deletedMessages
        }catch(err){
            throw new CustomError(500, "Error deleting messages");
        }
    }
}
