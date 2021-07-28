const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    const email = req.session.user
    if(email){
    const contatos = await Contato.buscaContatos(email.email);
    return res.render(`index`, { contatos });
    } else {
        const contatos = await Contato.buscaContatos(email);
        return res.render(`index`, { contatos });
    }
    // res.render(`index`, { contatos });
};
