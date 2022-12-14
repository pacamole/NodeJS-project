const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const categories = require("./controllers/user_routes/categories");
const posts = require("./controllers/user_routes/posts");
const adminRoutes = require("./controllers/admin_routes/admin_routes");
const session = require("express-session");
const flash = require("connect-flash");
const { SelectAllPosts } = require("./repository/posts");

class App {
  constructor() {
    this.app = express();
    this._configApp();
    this.routes();
  }

  _configApp() {
    // Session
    this.app.use(
      session({
        secret: "**CHAVE SECRETA**",
        resave: true,
        saveUninitialized: true,
      })
    );
    this.app.use(flash());
    // Middleware
    this.app.use((req, res, next) => {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      next();
    });

    // Handlebars
    this.app.engine(
      "handlebars",
      handlebars.engine({
        defautLayout: "main",
        runtimeOptions: {
          allowProtoPropertiesByDefault: true,

          allowProtoMethodsByDefault: true,
        },
      })
    );
    this.app.set("view engine", "handlebars");

    // Body Parser
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    // Public
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  routes() {
    this.app.all("/", (req, res, next) => {
      var date = new Date();
      var ts =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      console.log(`${ts} -- ${req.method} ${req.baseUrl}`);
      next();
    });

    this.app.get("/", async function (req, res) {
      var p = SelectAllPosts();
      console.log(`Todas as postagens: ${p}`);
      res.status(200).render("home", { posts: p });
    });
    this.app.use("/", posts);
    this.app.use("/categorias", categories);
    this.app.use("/admin", adminRoutes);
  }
}

module.exports = new App().app;
