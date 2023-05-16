const login = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/user/info')
    }else{
        res.render('login')
    }
}
const logout = (req, res) => {
    const user = req.user
    req.logout(() => {
        console.log("logout complete");
        return res.render('logout', {user: user.username})
    });
}
const info = (req, res) =>{
    const user = req.user;
    console.log(user);
    res.render('login-ok', {
        username: user.username,
        name: user.name,
        address: user.address,
        email: user.email,
        img: user.img,
        phone: user.phone,
        age: user.age
    })
}
const register = (req, res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/user/info')
    }
    res.render('register')
}

const failLogin = (req, res)=>{
    res.render('auth-fail', {auth:'LOGIN'})
}
const failRegister = (req, res)=>{
    res.render('auth-fail', {auth:'SIGN UP'})
}
export {failLogin,failRegister, register, info, logout, login}