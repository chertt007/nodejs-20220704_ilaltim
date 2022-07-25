const mongoose = require("mongoose");
const connection = require("../libs/connection");

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subcategories: [
    subCategorySchema
    // {
    //   title: {
    //     type: String,
    //     required: true
    //   }
    // }
  ]
});
// const Subcategory = mongoose.model("Subcategory", subCategorySchema);
module.exports = connection.model("Category", categorySchema);
