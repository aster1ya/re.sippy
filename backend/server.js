const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

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
    res.send("Hello from backend!");
  });
  
//Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//--- end of startup ---

//Gets the exported RecipeDetails model from RecipeSchema.js
const Recipe = require("./models/RecipeSchema");

const User = require("./models/UserSchema");




// ####
// #### Here you create GET and POST requests with a chosen url extension to make API calls with
// ####



//GET request to get all recipes
//had to do /api/recipes instead of just /recipes because /recipes is already taken by the page recipes.tsx
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/recipe", async (req, res) => {
  try {
    const id = req.query.recipeId;

    const recipes = await Recipe.find({_id : id});
    console.log("real recipes:"+recipes)
    res.json(recipes);
  } catch (err) {
    console.log("real error: "+err.message)
    res.status(500).json({ message: err.message });
  }
});


//POST request to create a recipe based on the request
app.post("/api/recipes", async (req, res) => {
 
  //destructures the input (req.query) into useful variables
  try {
    const { recipe } = req.body;

    const recipe = await Recipe.create(recipe)
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


    const mongoRecipe = new Recipe(recipe)

    const createdRecipe = await mongoRecipe.save()
    res.send({recipe : createdRecipe, success : true}) // send a copy of the created recipe after it is created
  }
  catch (e) {
    console.log("recipe creation error: "+e.message)
    res.send({error : e.message, success : false}) // sends an error if fails
  }
  });

//POST request to update a recipe based on the request
app.post("/api/recipe", async (req, res) => {
  
  //destructures the input (req.query) in to useful variables
  const { recipe } = req.query;

  //uses those variables to update a new recipe in the database
  try {
    const recipe = await Recipe.save()
    res.send({recipe : recipe, success : true}) // send a copy of the update recipe after it is created
  } catch (e) {
    res.send({error : e.message, success : false}) // sends an error if fails
  }
});


//search recipes by title, tags, author, or if favorited. You can only put in one of the search types and it'll only search by that.
app.get("/api/search", async (req, res) => {
  try{
    console.log(req.query)
    const {searchTerm = null, tags = null, userAuthorId = null, userFavoriteIds = null} = req.query
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

    if(userFavoriteIds){ //its id must be in the list of given favorites (UNTESTED)
      query["_id"] = { $in: userFavoriteIds }
    }
    console.log("query:")
    console.log(query)
    const recipes = await Recipe.find(query);
    res.json(recipes)
    
  }catch (e) {
    res.send("ERROR"+e.message)
  }
})