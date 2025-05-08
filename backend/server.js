const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

const mongoUrl = "mongodb+srv://baileythorp04:f8sGmijviZoztIKw@resippycluster.frsxfia.mongodb.net/resippydb?retryWrites=true&w=majority&appName=resippyCluster";
const port = 5000;

//middleware to allow special requests to be made
app.use(cors()); //needed for react native?
app.use(express.json()); //allows JSON requests to be made 

//Connecting to MongoDB
mongoose.connect(mongoUrl).then(() => {
    console.log("database connected.");
}).catch((e)=>{
    console.log(e);
});

//Basic Route (Test)
app.get('/', (req, res) => {
    res.send('Hello from backend!');
  });
  
//Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//--- end of startup ---



// ####
// #### Here you create GET and POST requests with a chosen url extension to make API calls with
// ####

//Gets the exported RecipeDetails model from RecipeSchema.js
const Recipe = require('./models/RecipeSchema');

//GET request to get all recipes
//had to do /api/recipes instead of just /recipes because /recipes is already taken by the page recipes.tsx
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    const id = req.query.recipeId;
    //if 'id' parameter is provided, find the recipe with that id. otherwise, give all recipes.
    if (id) {
      const recipes = await Recipe.find({_id : id});
      const recipe = recipes[0];
      res.json(recipe);
    } else {
      const recipes = await Recipe.find();
      res.json(recipes);
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//POST request to create a recipe based on the request
app.post('/api/recipes', async (req, res) => {
  
  //destructures the input (req.body) into useful variables
  const { title, description, ingredients, instructions } = req.body;

  //uses those variable to create a new recipe from the Recipe model
    try {
      const recipe = await Recipe.create({
        title: title,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
      })
      res.send({recipe}) // send a copy of the created recipe after it is created
    }
    catch (e) {
      res.send(e.message) // sends an error if fails
    }
    });

/*
    Put something like this in the 'Body' part in Insomnia when testing
    {
      "title": "spaghetti",
      "ingredients": "pasta and other things",
      "instructions": "put it all together"
    }

	
*/



//POST request to create a default, hard coded recipe with no request needed.
app.post('/api/recipes/test', async (req, res) => {

    try {
      const recipe = await Recipe.create({
        title: "pizza",
        ingredients: "asd",
        instructions: "dddddd",
      })
      res.send({recipe})
    }
    catch (e) {
      res.send(e.message)
    }
    });