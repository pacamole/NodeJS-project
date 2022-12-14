const { Router } = require("express");
const route = Router();

route.get("/", (req, res) => {
  res.status(200).render("<p>Eita! Como você chegou aqui?!</p>");
});

module.exports = route;
