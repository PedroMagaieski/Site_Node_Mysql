const LocalStrategy = require('passport-local').Strategy;
const user = require('./models/user')

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        try {
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'nome',
        passwordField: 'senha'
    },
    function(nome, senha, done) {
        user.findAll({
            where: {
                'nome': nome,
                'senha': senha
            }
        }).then(function(user){
            if (!user) {
                console.log("usuario não encontrado")
                return done(null,false) 
            }else if(user.length <= 0){
                console.log("nome ou senha incorretos")
                return  done(null,false)
            }else{
                console.log(user)
                return done(null,user)
            }
        })
        }
    ));
}