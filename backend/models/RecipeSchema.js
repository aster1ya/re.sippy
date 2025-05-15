const mongoose = require('mongoose')

//#################################################################################################
//IF YOU UPDATE THIS SCHEMA, PLEASE ALSO UPDATE types/Recipe.tsx TO HAVE THE SAME FIELDS AND TYPES.
//#################################################################################################

const RecipeSchema = new mongoose.Schema({
    //note: default values aren't applied because recipe creation currently hsa them defined with null. Defaults only applies if undefiend.
    title: { type: String, required: true, default: "default recipe title"},
    description: {type: String, default: "default description" },
    ingredients: { type: String, default: "default ingredients" },
    instructions: { type: String, default: "default instructions" },

    authorId: {type: String, required: false },

    rating: { type: Number },
    difficulty: { type: String },
    cookTime: { type: String },

    //when creating recipes with categories elsewhere, make sure to have a consistent list of categories somewhere.
    categories: { type: [String] },

    isGlutenFree: { type: Boolean, default: false },
    isVegetarian: { type: Boolean, default: false },
    isVegan: { type: Boolean, default: false },
    isHalal: { type: Boolean, default: false },
    isPet: { type: Boolean, default: false },



  });

module.exports = mongoose.model('Recipe', RecipeSchema);