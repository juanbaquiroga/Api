import { UserDaoFactory } from "../daos/DAOFactory.js";
import CustomError from "../classes/CustomError.class.js";
import config from '../config/config.js'

const DAO = UserDaoFactory.getClient(config.database);


const createUser = async (createUserRequest) => {
    try {
        const createdUser = await DAO.create(createUserRequest);
        return createdUser;
    } catch (err) {
        throw new CustomError(500, "error creating user");
    }
};

const findByUsername = async (username) => {
    try {
        const user = await DAO.getByUsername(username);
        return user;
    } catch (err) {
        throw new CustomError(500, "user not found");
    }
};

export const userService = {
    createUser,
    findByUsername
};