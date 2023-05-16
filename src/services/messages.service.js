import { MessagesDaoFactory } from "../daos/DAOFactory.js";
import CustomError from "../classes/CustomError.class.js";
import config from '../config/config.js'

const DAO = MessagesDaoFactory.getClient(config.database);


const createMessage = async (createMessageRequest) => {
    try {
        const message = await DAO.create(createMessageRequest);

        return message
    } catch (err) {
        throw new CustomError(500, 'error creating message');
    }
};



const deleteMessage = async (id) => {
    try {
        const existingMessage = DAO.getOne({_id: id});

        if (!existingMessage) {
            throw new CustomError(500, 'the message dont exist')
        }

        const deletedMessage = await DAO.delete(id);

        return deletedMessage;
    } catch (err) {
        throw new CustomError(500, 'invalid credentials')
    }
};
const deleteAllMessages = async (id) => {
    try {
        const deletedMessages = await DAO.delete();

        return deletedMessages;
    } catch (err) {
        throw new CustomError(500, 'invalid credentials')
    }
};

const findAllMessages = async () => {
    try {
        const messages = await DAO.getAll();

        return messages;
    } catch (err) {
        throw new CustomError(500, 'messages not found')
    }
};
const findMessagesByUsername = async (username) => {
    try {
        const messages = await DAO.getMany({username:username});

        return messages;
    } catch (err) {
        throw new CustomError(500, 'messages not found')
    }
};

const findMessageById = async (id) => {
    try {
        const message = await DAO.getOne({_id:id});

        if (!message) {
            throw new CustomError(500, 'the message dont exist')
        }

        return message;
    } catch (err) {
        throw new CustomError(500, 'message not found')
    }
};

export const messageService = {
    createMessage,
    findAllMessages,
    findMessagesByUsername,
    findMessageById,
    deleteMessage,
    deleteAllMessages
};
