const { Router } = require("express");
const { SelectPostsByCategory } = require("../../repository/posts");

const route = Router();

route.get("/:category_name/posts", async function (req, res) {
  try {
    var category = req.params.category_name;
    console.log(`category: ${category}`);

    p = await SelectPostsByCategory(category);
    res.render("./users/posts/posts", { posts: p });
  } catch (error) {}
});

module.exports = route;
