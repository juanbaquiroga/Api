import { UserDaoFactory } from "../daos/DAOFactory.js";
import CustomError from "../classes/CustomError.class.js";
import config from '../config/config.js'

const DAO = UserDaoFactory.getClient(config.database);


const createUser = async (createUserRequest) => {
    try {
        const createdUser = await DAO.create(createUserRequest);
        return createdUser;
    } catch (err) {
        throw new CustomError(500, "The username you provided is not valid");
    }
};

const findUserByFilter = async (filter) => {
    try {
        const user = await DAO.getOne(filter);
        return user;
    } catch (err) {
        throw err;
    }
};

export const userService = {
    createUser,
    findUserByFilter
};