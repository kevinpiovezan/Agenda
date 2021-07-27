const Login = require('../models/LoginModel');


exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    res.render(`login`);
    return
};
exports.register = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.register();
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(() => {
               return res.redirect('back');    
            });
        }   else{req.flash('success', 'Seu usuário foi criado com sucesso.');
            req.session.save(() => {
               return res.redirect('back');    
            })};
    }catch(e){
        console.log(e);
        return res.render('404');
    }
}
exports.login = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.login();
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(() => {
               return res.redirect('back');    
            });
        return;
        }   else{req.flash('success', 'Você entrou com sucesso');
            req.session.user = login.user;
            req.session.save(() => {
               return res.redirect('back');    
            })};
    }catch(e){
        console.log(e);
        return res.render('404');
    }
}
exports.logout = (req,res)=> {
    req.session.destroy();
    res.redirect('/')
}