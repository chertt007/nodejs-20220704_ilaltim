const Product = require("../models/Product");
const Category = require("../models/Category");
const ObjectId = require("mongoose").Types.ObjectId;
module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const { subcategory } = ctx.query;
  // console.log("sub cat id: ", subcategory);
  if (!subcategory) return next();
  if (!ObjectId.isValid(subcategory)) {
    ctx.response.status = 400;
    ctx.body = { status: "sub category id is not valid" };
    return;
  }
  const products = await Product.find({ subcategory: subcategory });
  // console.log(products);
  if (!products.length) {
    ctx.response.status = 404;
    ctx.body = { status: "no such items" };
    return;
  }
  ctx.body = { products };
};

module.exports.productList = async function productList(ctx, next) {
  ctx.body = { stam: "no response" };
};

module.exports.productById = async function productById(ctx, next) {
  console.log(ctx.request.url.split("/")[3]);
  const productId = ctx.request.url.split("/")[3];
  if (!ObjectId.isValid(productId)) {
    ctx.response.status = 400;
    ctx.body = { status: "product id is not valid" };
    return;
  }
  const product = await Product.findOne({ _id: productId });

  if (product === null) {
    ctx.response.status = 404;
    ctx.body = { status: "no such product" };
    return;
  }
  ctx.body = { product };
};
