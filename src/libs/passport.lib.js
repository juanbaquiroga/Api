import bcrypt from "bcrypt";
import { cartService, userService } from '../services/index.js'
import LocalStrategy from 'passport-local';
import { createTransport } from "nodemailer";
import logger from './logger.lib.js';



// const transporter = createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "sylvester37@ethereal.email",
//     pass: "z4jDd5658uZt3Wj7eN",
//   },
// });

const hashPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const validatePassword = (plainPassword, hashedPassword) =>{
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

const loginStrategy = new LocalStrategy(async (username, password, done)=>{
    try{
        const user = await userService.findUserByFilter({username: username});
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
            const existingUser = await userService.findUserByFilter({username: username});
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
                age: req.body.age
            };
            const newCart = {
                username,
                products: []
            }
            const createdUser = await userService.createUser(newUser);
            await cartService.createCart(newCart);

            // const mailOtions = {
            //     from: "Servidor Node",
            //     to: "sigrid.stokes13@ethereal.email",
            //     subject: `nuevo usuario creado ${username}`,
            //     text:`username: ${newUser.username} \n email:${newUser.email} \n username:${newUser.username} \n age: ${newUser.age} \n address: ${newUser.phone}`
            // };
            // try {
            //     await transporter.sendMail(mailOtions);
            // } catch (err) {
            //     logger.error(err)
            // }

            req.user = createdUser;
            done(null, createdUser);
        } catch (error) {
            done('Error while register', null)
        }
    }
);

export const passportStrategies = { loginStrategy, registerStrategy };