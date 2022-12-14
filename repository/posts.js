const { Post, Category } = require("./db");

async function InsertPost(title, slug, description, content) {
  await Post.create({
    title: title,
    slug: slug,
    description: description,
    content: content,
  });
  return;
}

async function SelectAllPosts() {
  posts = await Post.findAll({ order: [["createdAt", "DESC"]] });
  return posts;
}

async function SelectPostsByCategory(categoryName) {
  posts = await Post.findAll({
    raw: true,
    attributes: ["title"],
    include: [
      {
        model: Category,
        required: true,
        where: { name: categoryName },
        attributes: ["id"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return posts;
}

async function SelectPost(id) {
  post = await Post.findOne({ where: { id: id } });
  return post;
}

module.exports = {
  InsertPost,
  SelectAllPosts,
  SelectPostsByCategory,
  SelectPost,
};
