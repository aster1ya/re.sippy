const mongoose = require('mongoose')

//#################################################################################################
//IF YOU UPDATE THIS SCHEMA, PLEASE ALSO UPDATE types/Recipe.tsx TO HAVE THE SAME FIELDS AND TYPES.
//#################################################################################################

const RecipeSchema = new mongoose.Schema({
    //note: default values aren't applied because recipe creation currently has them defined with null. Defaults only applies if undefiend.
    title: { type: String, required: true, default: "New Recipe" },

    authorId: { type: String, required: false },
    mealType: { type: String, required: false },
    prepTime: { type: String, required: false },
    cookTime: { type: String, required: false },
    totalTime: { type: String, required: false },
    servings: { type: String, required: true, default: 1},

    description: { type: String, default: "No Description Available" },
    ingredients: { type: String, default: "No Ingredients Available" },
    instructions: { type: String, default: "No Instructions Available" },
    notes: { type: String, default: "No Notes Available"},

    //when creating recipes with categories elsewhere, make sure to have a consistent list of categories somewhere.
    tags: { type: [String] },
  });

module.exports = mongoose.model('Recipe', RecipeSchema);