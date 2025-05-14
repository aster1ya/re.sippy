const mongoose = require('mongoose')

//##############################################################################
//IF YOU UPDATE THIS SCHEMA, PLEASE ALSO UPDATE types/Recipe.tsx TO BE THE SAME.
//##############################################################################

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true, default: "default recipe title"},
    description: {type: String, default: "default description" },
    ingredients: { type: String, default: "default ingredients" },
    instructions: { type: String, default: "default instructions" },

    //author: { type: mongoose.Schema.Types.ObjectId, ref:'UserSchema', required: true },
    //This line is to link the recipe to its author, but need to verify how relationships are actually done

    rating: { type: Number },
    difficulty: { type: String },
    cookTime: { type: String },
    categories: { type: [String] }, //this should maybe be referenced to a list of categories somewhere


    isGlutenFree: { type: Boolean, default: false },
    isVegetarian: { type: Boolean, default: false },
    isVegan: { type: Boolean, default: false },
    isHalal: { type: Boolean, default: false },
    isPet: { type: Boolean, default: false },


  });

module.exports = mongoose.model('Recipe', RecipeSchema);