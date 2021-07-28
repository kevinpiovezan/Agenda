const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    telefone: {type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now},
    criadoPor: {type: String}
});
const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
};



Contato.prototype.register = async function() {
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
    
}

Contato.prototype.valida= function(){
    this.cleanUp()
    //Validacao, 
    //o nome precisa ser valido, 
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    //senha deve ter entre 6 e 32 chars
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if(!this.body.email && !this.body.telefone) {
        this.errors.push('Pelo menos um contato deve ser adicionado.');
    };
    return;
}

Contato.prototype.cleanUp= function() {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }
    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
        criadoPor: this.body.user,
    }
} 

Contato.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
}

//METODOS ESTATICOS

Contato.buscaPorID = async function(id){
    if(typeof id !== 'String');
    const contato = await ContatoModel.findById(id);
    return contato;
};

Contato.buscaContatos = async function(id){
    const contatos = await ContatoModel.find({criadoPor: id}).sort({criadoEm: -1});
    return contatos;
};

Contato.delete = async function(id){
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id: id});
    return contato;
};

module.exports = Contato;