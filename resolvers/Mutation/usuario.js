const { usuarios, proximoId } = require('../../data/db.js')
const validate = require("../../validations/email.js");

function indiceUsuario (filtro) {
    if(!filtro) return -1
    const { id, email } = filtro;
    if(id) {
        return usuarios.findIndex(u => u.id === id);
    } else if(email) {
        return usuarios.findIndex(u => u.email === email);
    }
    return -1;
}

module.exports = {
    novoUsuario(_, { dados }) {
        validate.Email(dados);
        
        const novo = {
            id: proximoId(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        };
        usuarios.push(novo);
        return novo;
    },
    excluirUsuario(_, { id }) {
        const i = usuarios
        .findIndex(user => user.id === id)
        if(i < 0) return null;
        const excluidos = usuarios.splice(i, 1);
        return excluidos ? excluidos[0] : null
    },
    alterarUsuario(_, { filtro, dados }) {
        const i = indiceUsuario(filtro);
        if(i < 0) return null;

        const usuario = {
            ...usuarios[i],
            ...dados
        };

        usuarios.splice(i, 1, usuario);
        return usuario;
    }
}