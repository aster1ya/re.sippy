const mongoose = require('mongoose')

//#################################################################################################
//IF YOU UPDATE THIS SCHEMA, PLEASE ALSO UPDATE types/Recipe.tsx TO HAVE THE SAME FIELDS AND TYPES.
//#################################################################################################

const RecipeSchema = new mongoose.Schema({
    //note: default values are currently being handled through the controller, not this or types/IRecipe
    title: { type: String, required: true},
    description: {type: String, default: "default description" },
    ingredients: { type: String, required: true},
    instructions: { type: String, required: true},

    authorId: {type: String, required: true },

    rating: { type: Number, default: 3 },
    difficulty: { type: String, default: "default difficulty"  },
    cookTime: { type: String, default: "default cook time"  },

    //when creating recipes with categories elsewhere, make sure to have a consistent list of categories somewhere.
    tags: { type: [String], default: [] },





  });

module.exports = mongoose.model('Recipe', RecipeSchema);