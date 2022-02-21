//tabela usuarios do banco de dados mysql
const db = require("./db");
const user = db.sequelize.define("usuarios", {
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

module.exports = user;

//user.sync({force: true})
//utilizar comando acima apenas uma vez para criar a tabela e em seguida comentar
//se usado novamente ira sobreescrever a tabela
