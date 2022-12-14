const Sequelize = require("sequelize");
// Connect to PostgreSQL database
const sequelize = new Sequelize("test", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
});

const Category = sequelize.define("categories", {
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT },
});

// Category.sync({force: true})

const Post = sequelize.define("posts", {
  title: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.STRING, allowNull: false },
});

Post.belongsTo(Category, { allowNull: false });

// Post.sync({force: true})

module.exports = {
  Category,
  Post,
};
