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
    return recipe;
  } catch (error) {
    console.log("failed to get recipe by id");
    console.log(error);
    return null;
  }
};

//creates recipe. returns if it was successful or not. for create page.
export const CreateRecipeRequest = async (
  title: string | null,
  description: string | null,
  ingredients: string | null,
  instructions: string | null
) => {
  try {
    const response = await axios.post(apiUrl + "/recipes", {
      title: title,
      description: description,
      ingredients: ingredients,
      instructions: instructions,
    });

    return [response.data.success, response.data.recipe];
  } catch (error) {
    console.log("failed to create recipe");
    console.log(error);
    return [false, null];
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
