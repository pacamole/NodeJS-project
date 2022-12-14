const { Router } = require("express");
const {
  InsertCategory,
  SelectAllCategories,
  SelectCategory,
  UpdateCategory,
  DeleteCategory,
} = require("../../repository/category");

const route = Router();

route.get("/", async function (req, res) {
  try {
    var categories = await SelectAllCategories();

    res
      .status(200)
      .render("./users/categories/categories", { categories: categories });
  } catch (e) {
    console.log("Select all categories error: " + e);
  }
});

route.get("/nova", (req, res) => {
  res.status(200).render("./users/categories/create_category");
});

route.post("/nova", (req, res) => {
  nome = req.body.nome;
  descricao = req.body.descricao;
  console.log(`Nome da categoria: ${nome}`);
  console.log(`Descrição da categoria: ${descricao}`);

  var errors = [];

  if (!nome || typeof nome == undefined || nome == null) {
    errors.push({ text: "Nome inválido" });
  }
  if (nome.length < 3) {
    errors.push({ text: "Nome muito curto" });
  }

  if (!descricao || typeof descricao == undefined || descricao == null) {
    errors.push({ text: "Descrição inválida" });
  }
  if (descricao.length < 3) {
    errors.push({ text: "Descrição muito curta" });
  }

  if (errors.length != 0) {
    res.render("users/form.handlebars", { errors: errors });
  } else {
    try {
      InsertCategory(nome, descricao);
      req.flash("success_msg", "Categoria criada com sucesso!");
      res.redirect("/");
    } catch (e) {
      req.flash(
        "error_msg",
        "Houve um erro ao criar a categoria, tente novamente!"
      );
      console.log("\nInsert category error: " + e);
    }
  }
});

route.get("/editar/:id", async (req, res) => {
  try {
    id = req.params.id;
    c = await SelectCategory(id);

    res.status(200).render("./users/categories/edit_category", { category: c });
  } catch (e) {
    console.log(`Select all Category error:  ${e}\n`);

    req.flash("error_msg", `Ocorreu um erro inesperado: ${e}`);
    res.redirect("/");
  }
});

route.post("/editar", async (req, res) => {
  UpdateCategory(req.body.id, req.body.nome, req.body.descricao)
    .then(() => {
      req.flash("success_msg", "Postagem editada");
    })
    .catch((e) => {
      console.log(`Update post error: ${e}`);
      req.flash("error_msg", "Houve um erro ao realizar esta ação");
    });

  res.redirect("/");
});

route.post("/deletar", async (req, res) => {
  try {
    DeleteCategory(req.body.id)
      .then((_) => {
        req.flash("success_msg", "Postagem deletada");
        res.redirect("/");
      })
      .catch((e) => {
        console.log(`Houve um erro ao deletar a postagem: ${e}`);
        req.flash("error_msg", "Houve um erro ao deletar a postagem");
        res.redirect("/");
      });
  } catch (e) {
    console.log(`Delete post error: ${e}\n`);

    req.flash("error_msg", `Ocorreu um erro inesperado: ${e}`);
    res.redirect("/");
  }
});

module.exports = route;
