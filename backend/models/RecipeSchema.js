const mongoose = require("mongoose")

//#################################################################################################
//IF YOU UPDATE THIS SCHEMA, PLEASE ALSO UPDATE types/Recipe.tsx TO HAVE THE SAME FIELDS AND TYPES.
//#################################################################################################

const RecipeSchema = new mongoose.Schema({

    //note: default values are currently being handled through the controller, not this or types/IRecipe
    title: { type: String, required: true },
    description: {type: String, default: "No Description Available" },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    notes: { type: String, default: "No Notes Available" },

    authorId: { type: String, required: true },
    author: { type: String, default: "User" },
      
    mealType: { type: String },
    prepTime: { type: String },
    cookTime: { type: String },
    totalTime: { type: String },
    servings: { type: String, default: "1" },

    //when creating recipes with categories elsewhere, make sure to have a consistent list of categories somewhere.
    tags: { type: [String], default: [] },
  });

module.exports = mongoose.model("Recipe", RecipeSchema);