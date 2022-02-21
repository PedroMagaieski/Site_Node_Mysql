//arquivo principal do site
const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const user = require("./models/user")
const session = require('express-session')
const passport = require('passport');
require('./auth')(passport);

/*aqui os futuros módulos de criptografia e mensagens flash
const bcypt = require("bcrypt")
const flash =  require("flash")
*/
//config
    //engine do template:
        app.engine("handlebars", handlebars({defaultLayout:"main"}))
        app.set("view engine","handlebars")
    //express importa o body no lugar do body-parser
        app.use(express.urlencoded({extended: false}));
        app.use(express.json());
    //session
        app.use(session({
            secret: '123',
            resave: true,
            saveUninitialized: true
        }));
    //inicializar passport 
        app.use(passport.initialize());
        app.use(passport.session());
    //rotas:
        app.get("/",function(req,res){
          res.render('home')
        })
        app.get("/login",function(req,res){
            res.render('login')
        })
        app.get('/user', function(req, res) {
            req.session.loggedin = true;
            if (req.session.loggedin) {
                res.send('Bem vindo de volta, ' + req.session.nome + ' !');
                //aqui dando undefined
            } else {
                res.send('Por favor faça login para ver essa pagina!');
            }
            res.end();
        });
        //corrigir essa rota aqui
        /*app.get("/adm",function(req,res){
            if (req.session.loggedin) {
                user.findAll({order: [['id','DESC']]}).then(function(user){
                    res.render('user',{user:user})
                })
            }else {
                res.send('Por favor faça login para ver essa pagina!');
            }
            res.end();
        })*/

        app.get("/deletar/:id",function(req,res){
            user.destroy({where:{"id": req.params.id}}).then(function(){
                res.redirect("/")
            }).catch(function(erro){
                res.send("esse usuario não existe! ERRO: " + erro)
            });
        })
        app.get("/cadastro",function(req,res){
            res.render("form");
        })
        app.post("/add",function(req,res){
            user.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            }).then(function(){
                res.redirect("/")
            }).catch(function(erro){
                res.send("Erro ao cadastrar usuario: " + erro)
            });
        });
        //autenticação
        /*app.post('/login',
            passport.authenticate('local'),
            function(req, res) {
                // If this function gets called, authentication was successful.
                nome = req.body.nome;
                req.session.loggedin = true;
                req.session.nome = nome;
                //res.redirect('/user');
        });*/
        app.post('/login', passport.authenticate('local', { successRedirect: '/user',
                                                    failureRedirect: '/login'
        }));
    app.listen(8081,function(){
        console.log("Servidor rodando na url : http://localhost:8081");
    })
