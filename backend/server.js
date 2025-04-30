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

//Gets the exported RecipeDetails model from RecipeSchema.js
const Recipe = require('./models/RecipeSchema');

const User = require('./models/UserSchema');




// ####
// #### Here you create GET and POST requests with a chosen url extension to make API calls with
// ####



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



//POST request to create a recipe based on the request
app.post('/api/recipes', async (req, res) => {
  
  //destructures the input (req.body) into useful variables
  const { title, ingredients, instructions } = req.body;

  //uses those variable to create a new recipe from the Recipe model
    try {
      const recipe = await Recipe.create({
        title: title,
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


app.post('/api/register', async (req, res) => {
  const {username, password, email} = req.body
  console.log("register post called")
  try{

    const user = await User.create({
      username: username,
      password: password,
      email: email
      
    })
    res.send("user created: " + user.username)
  }catch (e) {
    res.send("ERROR"+e.message)
  }
})