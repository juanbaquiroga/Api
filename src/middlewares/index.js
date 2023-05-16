import logger from "../libs/logger.lib.js";


const isLoged = (req, res, next)=>{
    const admitedUrls = ['/user/login', '/user/register', '/user/fail-login', '/user/fail-register']
    const admited = admitedUrls.some((url) => url === req.path)
    if (!admited){
        if(req.isAuthenticated()){
            next()
        }else{
            res.redirect('/user/login')
        }
    }else{
        next()
    }
}

const invalidUrl = (req, res, next) => {
    logger.warn({
        method: req.method,
        url: req.url
    });
    res.render("invalid-route");
};


export const middlewares = {isLoged, invalidUrl}