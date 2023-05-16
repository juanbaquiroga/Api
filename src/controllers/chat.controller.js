import { messageService } from "../services/index.js";

const getChat = (req,res)=>{
    try {
        const user = req.user
        res.render('chat', { username: user.username, userImg:user.img, userEmail: user.email, userId: user._id, userAdmin:user.admin})
    } catch (err) {
        next(err);
    }
}

const getUserChat = async (req, res) =>{
    try {
        const user = req.user
        const chats = await messageService.findMessagesByUsername(user.username)
        res.render('user-chat', { username: user.username, userImg:user.img, chats: chats})
    
    } catch (err) {
        next(err);
    }
}


export {getChat, getUserChat}