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

    const { recipeId } = req.query;
    const recipe = await Recipe.findById(recipeId);
    res.json(recipe);

  } catch (err) {
    console.error("Error fetching recipe:", err.message);
    res.status(500).json({ message: err.message });
  }
});


//POST request to create a recipe based on the request
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


app.get("/api/search", async (req, res) => {
  try {
    const { searchTerm, q, tags, userAuthorId, userFavoriteIds } = req.query;

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

    if (userFavoriteIds) {
      const ids = Array.isArray(userFavoriteIds)
        ? userFavoriteIds
        : [userFavoriteIds];
      query._id = { $in: ids };
    }

    console.log("Search query:", query);
    const results = await Recipe.find(query);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).send("Search failed: " + err.message);
  }
});
