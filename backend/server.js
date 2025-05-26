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

app.get('/api/recipe', async (req, res) => {
  try {
    const id = req.query.recipeId;

    const recipes = await Recipe.find({_id : id});
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//POST request to create a recipe based on the request
app.post('/api/recipes', async (req, res) => {
  
  //destructures the input (req.query) into useful variables
  const { title, description, ingredients, instructions } = req.query;

  //uses those variable to create a new recipe from the Recipe model
    try {
      const recipe = await Recipe.create({
        title: title,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
      })
      res.send({recipe : recipe, success : true}) // send a copy of the created recipe after it is created
    }
    catch (e) {
      res.send({error : e.message, success : false}) // sends an error if fails
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



//search recipes by title, tags, author, or if favorited. You can only put in one of the search types and it'll only search by that.
app.get('/api/search', async (req, res) => {
  try{
    console.log(req.query)
    const {searchTerm = null, tags = null, userAuthorId = null, userIdForFavorites = null} = req.query
    let query = {}


    //each of the following conditions are added to the final query only if the variable is provided
    //the final query gets recipes where all conditions are true 

    if(searchTerm){ //recipes' title must contain the search term, case insensitive
      query["title"] = { $regex: searchTerm, $options: "i" };
    }

    if(tags){//it must have all tags given
      const tagsArray = Array.isArray(tags) ? tags : [tags] //turn categores into an array if it isnt already
      query["tags"] = {$all: tagsArray};
    }

    if(userAuthorId){ //it recipe must have the given author (UNTESTED)
      query["authorId"] = userAuthorId;
    } 

    if(userIdForFavorites){ //its id must be in the list of given favorites (UNTESTED)
      const mongoUser = await User.findOne({ firebaseUID : userIdForFavorites})
      const favoriteRecipeIds = mongoUser.favoriteRecipeIds;
      query["_id"] = { $in: favoriteRecipeIds }
    }

    const recipes = await Recipe.find(query);
    res.json(recipes)
    
  }catch (e) {
    res.send("ERROR"+e.message)
  }
})

app.post("/api/register", async (req, res) => {

  const { UID } = req.body

  try {
      const user = await User.create({
        firebaseUID : UID,
      })
      console.log("mongo user created successfully")
      res.send({user : user, success : true}) // send a copy of the created user after it is created
    }
    catch (e) {
      console.log("error creating mongo user: " + e)
      res.send({error : e.message, success : false}) // sends an error if fails
    }

});

app.get("/api/user", async (req, res) => {

  const { UID } = req.query;

  try {
    const query = { firebaseUID : UID };
    const user = await User.findOne(query);
    
    res.send({user : user, success : true}) 
  }
  catch (e) {
    res.send({error : e.message, success : false}) 
  }
})

app.post("/api/recipe/favorite", async (req, res) => {
  try{
    const { UID, recipeId } = req.body;
    let didFavorite;
    
    const user = await User.findOne({ "firebaseUID" : UID })
    const favoriteIds = user.favoriteRecipeIds;
    
    console.log("Found user uid:" + user.firebaseUID);

    const index = user.favoriteRecipeIds.indexOf(recipeId);
    if (index > -1) {
      user.favoriteRecipeIds.splice(index, 1);
      didFavorite = false;
    } else {
      user.favoriteRecipeIds.push(recipeId);
      didFavorite = true;
    }
    
    user.save();
    res.send({success: true, favorited: didFavorite})
  } catch (error) {
    res.send({error : error.message, success : false}) 
  }
    
  })
