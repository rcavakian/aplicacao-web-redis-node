require("dotenv").config({ path: ".env" });
const express = require("express");
const exphbs = require("express-handlebars").create();
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { redisClient } = require("../src/database/database");

// Configurar port
const port = 3000;

// Inicializar app
const app = express();

// View engine: motor de templates que permite gerar HTML dinâmico
// com o uso de templates (ou layouts) e dados dinâmicos. O Handlebars
// permite criar páginas HTML com placeholders que são preenchidos
// com dados do servidor.
app.engine("handlebars", exphbs.engine);
app.set("view engine", "handlebars");

// Registrar o helper 'translateBoolean'
const handlebars = require('handlebars');
handlebars.registerHelper('translateBoolean', function (value) {
  return value === 'true' || value === true ? 'Sim' : 'Não';
});
handlebars.registerHelper('eq', function (v1, v2) {
  return v1 === v2;
});

// Confirgurar o diretório das views
app.set("views", path.join(__dirname, 'views'));

// Confirgurar o diretório do style css
app.use(express.static(path.join(__dirname, '../public')));

// Body-parser: middleware que processa o corpo da requisição e
// converte em objeto Javascript, essencial para manipular os
// dados de entrada e extrair informações da requisição.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Method-override impletado para que possamos fazer um 'delete' request
// com um form
app.use(methodOverride("_method"));

// Página de busca
app.get('/', function (req, res, next) {
  return res.render('layouts/searchusers');
});

// Processar a busca de usuário
app.post("/user/search", async function (req, res, next) {
  let id = req.body.id;
  console.log(req.body);
  if (id) {
    try {
      console.log("Tentando obter dados do Redis...");
      const obj = await redisClient.hGetAll(id);
      console.log("Dados retornados:", obj);

      if (!obj || Object.keys(obj).length === 0) {
        res.render("layouts/searchusers", {
          error: "Usuário não encontrado",
        });
      } else {
        obj.id = id;
        res.render("layouts/details", {
          user: obj,
        });
      }
    } catch (err) {
      console.error("Erro ao buscar dados do Redis: ", err);
      res.status(500).send("Erro no servidor");
    }
  }
});

// Página incluir usuário
app.get('/user/add', function (req, res, next) {
  res.render('layouts/adduser');
});

app.post('/user/add', async function (req, res, next){
    let id = req.body.id;
    let login = req.body.login;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let active = (req.body.active === 'yes') ? true : false;
    const activeString = active === true ? 'true' : 'false';
    console.log("ID:", id);
    console.log("Login:", login);
    console.log("First Name:", first_name);
    console.log("Last Name:", last_name);
    console.log("Email:", email);
    console.log("Active:", activeString);

    
    try {
        const obj = await redisClient.hSet(id, [
            'login', login,
            'first_name', first_name,
            'last_name', last_name,
            'email', email,
            'active', activeString
        ]);
        return res.redirect('/');
    } catch (err) {
        console.log('Erro ao incluir usuário: ', err);
        return res.status(500).send('Erro no servidor');
    }
});

app.get('/user/edit', function (req, res, next) {
  res.render('layouts/edituser');
})

// Editar um usuário a partir da view searchusers
app.get("/user/edit/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const user = await await redisClient.hGetAll(id);
    if (!user || Object.keys(user).length === 0) {
      return res.render("error", { message: "Usuário não encontrado" });
    }
    return res.render("layouts/edituser", { user, id });
  } catch (err) {
    console.log("Erro ao buscar dados do Redis: ", err);
    return res.status(500).send("Erro no servidor Redis");
  }
});


// Remover um usuário a partir da view details
app.delete('/user/delete/:id', async function (req, res, next) {
    await redisClient.del(req.params.id);
    res.redirect('/');
})

app.listen(port, function () {
  console.log(`Servidor iniciado na porta ${port}`);
});
