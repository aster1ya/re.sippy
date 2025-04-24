const mongoose = require('mongoose')

//schema is the fields and datatypes that the recipe model will have
const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: false, default: "default recipe title"},
    ingredients: { type: String, required: false, default: "default ingredients" },
    instructions: { type: String, required: false, default: "default instructions" },
  });

module.exports = mongoose.model('Recipe', RecipeSchema);