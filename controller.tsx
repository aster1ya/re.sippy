import axios from "axios";
import qs from "query-string";

import IRecipe from "./types/Recipe";

const apiUrl = "http://localhost:5000/api";

//returns all recipes. for recipe book page
export const GetAllRecipes = async () => {
  try {
    const response = await axios.get(apiUrl + "/recipes");
    console.log("success");
    return response.data;
  } catch (error) {
    console.log("failed to get all recipes");
    console.log(error);
    return null;
  }
};

//returns one recipe. for detail page
export const GetRecipeById = async (id: string) => {
  try {
    const response = await axios.get(apiUrl + "/recipe", {
      params: {
        recipeId: id,
      },
    });

    const recipe = response.data[0];
    console.log("controller recipe: ");
    console.log(recipe);
    return recipe;
  } catch (error) {
    console.log("failed to get recipe by id");
    console.log(error);
    return null;
  }
};

const TrimAndSetToDefault = (input: string | String, defaultValue: string) => {
  let output = input.trim();
  if (!output) {
    output = defaultValue;
  }
  return output;
};

//creates recipe. returns if it was successful or not. for create page.

export const CreateRecipeRequest = async ({
  title,
  description,
  ingredients,
  instructions = "default instructions 2",
  tags,
  authorId,
  cookTime = "default cooktime 2",
  difficulty = "default difficulty 2",
  rating,
}: IRecipe) => {
  try {
    description = TrimAndSetToDefault(description, "default description");
    if (!tags) {
      tags = [];
    }
    cookTime = TrimAndSetToDefault(cookTime, "default cooktime");
    difficulty = TrimAndSetToDefault(cookTime, "default difficulty");
    if (!rating) {
      rating = 3;
    }

    //throw error if mandatory field is missing
    title = title.trim();
    ingredients = ingredients.trim();
    instructions = instructions.trim();

    let missingFields = [];
    if (!title) {
      missingFields.push("Title");
    }
    if (!ingredients) {
      missingFields.push("Ingredients");
    }
    if (!instructions) {
      missingFields.push("Instructions");
    }
    if (!authorId) {
      missingFields.push("AuthorId (oops you aint logged in)");
    }

    if (missingFields.length > 0) {
      return { success: false, recipe: null, missingFields: missingFields };
    }

    const recipe: IRecipe = {
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients.trim(),
      instructions: instructions?.trim(),
      tags: tags,
      authorId: authorId,
      cookTime: cookTime.trim(),
      difficulty: difficulty.trim(),
      rating: rating,
    };

    const response = await axios.post(apiUrl + "/recipes", { recipe: recipe });

    return {
      success: response.data.success,
      recipe: response.data.recipe,
      missingFields: [],
    };
  } catch (error) {
    console.log("failed to create recipe");
    console.log(error);
    return { success: false, recipe: null, missingFields: [] };
  }
};

//SearchRecipes has dynamic input, you can input the arguments you want and the others will be send as null then ignored by the server.

interface SearchRecipesParams {
  title?: string | null;
  tags?: string[] | null;
  authorId?: string | null;
  favoriteIds?: string[] | null;
}

export const SearchRecipes = async ({
  title = null,
  tags = null,
  authorId = null,
  favoriteIds = null,
}: SearchRecipesParams) => {
  try {
    const response = await axios.get(apiUrl + "/search", {
      params: {
        searchTerm: title,
        tags: tags,
        userAuthorId: authorId,
        userFavoriteIds: favoriteIds,
      },
      paramsSerializer: { indexes: null },
    });

    return response.data;
  } catch (error) {
    console.log("failed to search for recipes");
    console.log(error);
    return null;
  }
};
