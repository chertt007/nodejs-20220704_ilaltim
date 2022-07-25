const Category = require("../models/Category");

module.exports.categoryList = async function categoryList(ctx, next) {
  // console.log("categories request", ctx.request);
  const categoryList = await Category.find({});
  // console.log(query);
  ctx.body = { categories: categoryList };
};
