import bcrypt from "bcrypt";
import { cartService, userService } from '../services/index.js'
import LocalStrategy from 'passport-local';
import logger from './logger.lib.js';



const hashPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const validatePassword = (plainPassword, hashedPassword) =>{
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

const loginStrategy = new LocalStrategy(async (username, password, done)=>{
    try{
        const user = await userService.findByUsername(username);
        if(!user || !validatePassword(password, user.password)){
            return done('invalid credentials', null)
        }
        done(null, user)
    } catch(err) {
        logger.error('error al logear usuario')
        done("Error while login in", null);
    }
});

const registerStrategy = new LocalStrategy( 
    { passReqToCallback: true },
    async (req, username, password, done) =>{
        try {
            const existingUser = await userService.findByUsername(username);
            if(existingUser) {
                return done('username alreaady in use', null)
            }
            const newUser = {
                username,
                password: hashPassword(password),
                name: req.body.name,
                img: req.body.img,
                email: req.body.email,
                phone: req.body.prefix + req.body.phone,
                address: req.body.address,
                age: req.body.age,
                admin: false
            };
            const newCart = {
                username,
                products: []
            }
            const createdUser = await userService.createUser(newUser);
            await cartService.createCart(newCart);

            req.user = createdUser;
            done(null, createdUser);
        } catch (error) {
            done('Error while register', null)
        }
    }
);

export const passportStrategies = { loginStrategy, registerStrategy };