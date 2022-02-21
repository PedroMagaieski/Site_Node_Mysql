//acesso/conectar ao banco de dados mysql
const Sequelize = require("sequelize");
const sequelize = new Sequelize("##db","##user","##senha",{
    host: "localhost",
    dialect: "mysql"
})
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso");
}).catch(function(erro){
    console.log("Ocorreu o erro: "+erro)
})
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
