const { Category } = require("./db");

async function InsertCategory(title, description) {
  await Category.create({
    title: title,
    description: description,
  });
  return;
}

async function SelectAllCategories() {
  var categories = await Category.findAll({ order: [["createdAt", "DESC"]] });
  return categories;
}

async function SelectCategory(id) {
  var category = await Category.findOne({ where: { id: id } });
  return category;
}

async function UpdateCategory(id, title, description) {
  p = await Category.findOne({ where: { id: id } });
  p.title = title;
  p.description = description;

  p.save();
  return;
}

async function DeleteCategory(id) {
  Category.destroy({ where: { id: id } });
  return;
}

module.exports = {
  InsertCategory,
  SelectAllCategories,
  SelectCategory,
  UpdateCategory,
  DeleteCategory,
};
