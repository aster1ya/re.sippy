const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

const mongoUrl = "mongodb+srv://baileythorp04:f8sGmijviZoztIKw@resippycluster.frsxfia.mongodb.net/resippydb?retryWrites=true&w=majority&appName=resippyCluster";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log("Database connected."))
  .catch((err) => console.error("MongoDB connection error:", err));


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




//get all recipes
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get one recipe by Id
app.get("/api/recipe", async (req, res) => {
  try {


    const { recipeId } = req.query;
    const recipe = await Recipe.findById(recipeId);
    res.json(recipe);

  } catch (err) {
    console.error("Error fetching recipe:", err.message);
    res.status(500).json({ message: err.message });
  }
});
	


//create mongo user.
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

//get mongo user by uid
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

//add/remove recipe from a mongo user's favorite list.
app.post("/api/recipe/favorite", async (req, res) => {
  try{
    const { UID, recipeId } = req.body;
    let didFavorite;
    
    const user = await User.findOne({ "firebaseUID" : UID })
    const favoriteIds = user.favoriteRecipeIds;
    if (user == null | user == undefined){
      console.log("Found user not found");
      
    }

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

//create recipe with inputs
app.post("/api/recipes", async (req, res) => {
 
  try {
    const { recipe, isUpdate } = req.body;

    const mongoRecipe = new Recipe(recipe)

    if(isUpdate){
      mongoRecipe.isNew = false;
    }
    const createdRecipe = await mongoRecipe.save()
    res.send({recipe : createdRecipe, success : true}) // send a copy of the created recipe after it is created
  }
  catch (e) {
    console.log("recipe creation error: "+e.message)
    res.send({error : e.message, success : false}) // sends an error if fails
  }
  });


//delete recipe with Id
app.delete("/api/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Recipe.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete recipe", detail: err });
  }
});

//search for recipes with various search conditions
app.get("/api/search", async (req, res) => {
  try {
    const { searchTerm, q, tags, userAuthorId, userIdForFavorites } = req.query;

    let query = {};

    const keyword = q?.trim() || searchTerm?.trim();
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      query.tags = { $all: tagArray };
    }

    if (userAuthorId) {
      query.authorId = userAuthorId;
    }

    if (userIdForFavorites) {
      const mongoUser = await User.findOne({firebaseUID : userIdForFavorites})
      const favRecipeIds = mongoUser.favoriteRecipeIds
      query._id = { $in: favRecipeIds };
    }

    console.log("Search query:", query);
    const results = await Recipe.find(query);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).send("Search failed: " + err.message);
  }
});

// MARK AS DONE for specific user (Post)
app.post("/api/recipes/:id/markDone", async (req, res) => {
  const recipeId = req.params.id;
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ success: false, message: "User ID required." });
  }

  try {
    const result = await Recipe.findByIdAndUpdate(
      recipeId,
      { $addToSet: { done: uid } }, // ensures uid is only added once
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ success: false, message: "Recipe not found." });
    }

    res.json({ success: true, message: "Recipe marked as done." });
  } catch (err) {
    console.error("Error marking as done:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// MARK AS DONE for specific user (Get)
app.get("/api/recipes/done/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const recipes = await Recipe.find({ done: uid });
    res.json(recipes);
  } catch (err) {
    console.error("Error fetching done recipes:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// REMOVE FROM DONE for specific user (Post)
app.post("/api/recipes/:id/removeFromDone", async (req, res) => {
  const recipeId = req.params.id;
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ success: false, message: "User ID required." });
  }

  try {
    const result = await Recipe.findByIdAndUpdate(
      recipeId,
      { $pull: { done: uid } }, // removes uid from the done array
      { new: true }
    );
    
    if (!result) {
      return res.status(404).json({ success: false, message: "Recipe not found." });
    }

    res.json({ success: true, message: "Recipe removed from done list." });
  } catch (err) {
    console.error("Error removing from done list:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

