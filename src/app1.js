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
handlebars.registerHelper('increment', function(value) {
  return parseInt(value) + 1;
})

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
    } catch (error) {
      console.error("Erro ao buscar dados do Redis: ", error);
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
    const timestamp = new Date;
    
    try {
        const obj = await redisClient.hSet(id, [
            'login', login,
            'first_name', first_name,
            'last_name', last_name,
            'email', email,
            'active', activeString
        ]);
        const userAdd = await redisClient.zAdd('users', [
          {
            score: timestamp.valueOf(),
            value: id,
          }
        ]);
        console.log(`Usuário ${userAdd} incluído.`);

        return res.redirect('/');
    } catch (error) {
        console.log('Erro ao incluir usuário: ', error);
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
      return res.render("layouts/edituser", { error: `Usuário ${id} não encontrado` });
    }
    return res.render("layouts/edituser", { user, id });
  } catch (error) {
    console.log("Erro ao buscar dados do Redis: ", error);
    return res.status(500).send("Erro no servidor Redis");
  }
});

// Função para enviar dados editados ao Redis
app.put("/user/update", async function (req, res, next) {
  const id = req.body.id;
  console.log("login:", req.body.login || "null ou undefined");

  try {
    const userFound = await redisClient.hGetAll(id);
    
    if (!userFound || Object.keys(userFound).length === 0) {
      res.render("layouts/edituser", { error: "Usuário não encontrado" });
      return;
    }

    const active = req.body.active === "yes" ? true : false;
    const activeString = active === true ? "true" : "false";

    userFound.login = (req.body.login !== "") ? req.body.login : userFound.login;
    userFound.first_name = (req.body.first_name !== "") ? req.body.first_name : userFound.first_name;
    userFound.last_name = (req.body.last_name !== "") ? req.body.last_name : userFound.last_name;
    userFound.email = (req.body.email !== "") ?  req.body.email : userFound.email;
    userFound.active = activeString;

    const updatedUser = {
      login: userFound.login,
      first_name: userFound.first_name,
      last_name: userFound.last_name,
      email: userFound.email,
      active: userFound.active,
    };

    await redisClient.hSet(id, updatedUser);
    res.redirect("/");
  } catch (error) {
    console.log("Erro ao buscar dados do Redis", error);
    return res.status(500).send("Erro no servidor Redis");
  }
});

// Remover um usuário a partir da view details
app.delete("/user/delete/:id", async function (req, res, next) {
    await redisClient.del(req.params.id);
    res.redirect('/');
})

app.listen(port, function () {
  console.log(`Servidor iniciado na porta ${port}`);
});

// Renderizar a tela de consulta a todos os usuários
app.get("/users", async function (req, res, next) {
  try {
    const returnTo = req.query.returnTo || null;
    const usersList = [];
    for await (const { score, value } of redisClient.zScanIterator('users')) {
      usersList.push({ id: value, timestamp: score });
    }
    if (!usersList || usersList.length === 0) {
      return res.render("layouts/userslist", { error: "Lista vazia" });
    }

    console.log('userlist: ', usersList);

    res.render("layouts/userslist", { usersList, returnTo });
  } catch (error) {
    console.error("Erro ao buscar usuários no Redis:", error);
    res.status(500).send("Erro ao buscar usuários");
  }
});

// A partir da tela 'Lista de Usuários' mostrar detalhes de um usuário
app.get("/users/details/:id", async function (req, res, next) {
  const id = req.params.id;

  try {
    const userDetails = await redisClient.hGetAll(id);
    if (!userDetails || Object.keys(userDetails) === 0) {
      return res
        .status(404)
        .render("layouts/userslist", { error: "Usuário não encontrado" });
    }

    userDetails.id = id;
    res.render("layouts/details", { user: userDetails });
  } catch (error) {
    console.error("Erro ao buscar detalhes do usuário:", error);
    res.status(500).send("Erro ao buscar detalhes do usuário");
  }
});