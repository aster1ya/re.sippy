import axios from "axios";
import qs from "query-string";

import IRecipe from "./types/Recipe";

import {
  createUserWithEmailAndPassword,
  validatePassword,
} from "firebase/auth";
import { auth } from "./backend/firebaseConfig";
import IUser from "./types/User";

const apiUrl = "http://localhost:5000/api";

//returns all recipes. for recipe book page
export const GetAllRecipes = async () => {
  try {
    const response = await axios.get(apiUrl + "/recipes");
    console.log("successfully got all recipes");
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

    const recipe = response.data;
    console.log("controller recipe: ");
    console.log(recipe);
    return recipe;
  } catch (error) {
    console.log("failed to get recipe by id");
    console.log(error);
    return null;
  }
};

const TrimOrSetToDefault = (
  input: string | String | undefined,
  defaultValue: string
) => {
  if (input === undefined) {
    return defaultValue;
  } else {
    let output = input.trim();
    if (!output) {
      return defaultValue;
    }
    return output;
  }
};

//creates recipe. returns if it was successful or not. for create page.

export const CreateRecipeRequest = async (
  {
    _id,
    title,
    authorId,
    author,
    mealType,
    prepTime,
    cookTime,
    totalTime,
    servings,
    description,
    ingredients,
    instructions,
    notes,
    tags,
  }: IRecipe,
  isUpdate: boolean = false
) => {
  try {
    mealType = TrimOrSetToDefault(mealType, "N/A");
    prepTime = TrimOrSetToDefault(prepTime, "N/A");
    cookTime = TrimOrSetToDefault(cookTime, "N/A");
    servings = TrimOrSetToDefault(servings, "1");
    description = TrimOrSetToDefault(description, "No Description Provided");
    notes = TrimOrSetToDefault(notes, "No Notes Provided");
    if (!tags) {
      tags = [];
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
      missingFields.push("AuthorId (Log In Required)");
    }

    if (missingFields.length > 0) {
      return { success: false, recipe: null, missingFields: missingFields };
    }

    const recipe: IRecipe = {
      _id: _id,
      title: title,
      authorId: authorId,
      author: author,
      mealType: mealType,
      prepTime: prepTime,
      cookTime: cookTime,
      totalTime: totalTime,
      description: description,
      ingredients: ingredients,
      instructions: instructions,
      notes: notes,
      tags: tags,
    };

    const response = await axios.post(apiUrl + "/recipes", {
      recipe: recipe,
      isUpdate: isUpdate,
    });

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
  favoriteUserId?: string | null;
}

export const SearchRecipes = async ({
  title = null,
  tags = null,
  authorId = null,
  favoriteUserId = null,
}: SearchRecipesParams) => {
  try {
    const response = await axios.get(apiUrl + "/search", {
      params: {
        searchTerm: title,
        tags: tags,
        userAuthorId: authorId,
        userIdForFavorites: favoriteUserId,
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

const CreateMongoUser = async (id: string) => {
  try {
    const response = await axios.post(apiUrl + "/register", {
      UID: id,
    });

    return response;
  } catch (error) {
    console.log("failed to create mongodb user");
    console.log(error);
    return null;
  }
};

export const RegisterUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("user created with email: ", user.email);

    ///aaaaaaaa how do i error catch this
    const response = await CreateMongoUser(user.uid);

    if (response) {
      //...
    }

    return { success: true, user: user, emailError: "", passwordError: "" };
  } catch (error: any) {
    console.log("create user error");
    console.log(error.code);
    console.log(error.message);

    let emailErrorMessage = "";
    let passwordErrorMessage = "";

    //uses the error codes to check if email is invalid. ignores if password is invalid
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/missing-email":
        emailErrorMessage = "Email must be in correct format.";
        break;
      case "auth/email-already-in-use":
        emailErrorMessage = "Email is already in use";
        break;
      case "auth/password-does-not-meet-requirements":
      case "auth/weak-password":
      case "auth/missing-password":
        emailErrorMessage = "";
        break;
      default:
        emailErrorMessage =
          "Unhandled error: " + error.code + " " + error.message;
        break;
    }

    //only get one error code at a time, so checking for password validation separately
    await validatePassword(auth, password).then((status) => {
      if (!status.isValid) {
        console.log("status: " + status.isValid);
        passwordErrorMessage = "Password must be at least 6 characters.";
      } else {
        passwordErrorMessage = "";
      }
    });
    return {
      success: false,
      user: null,
      emailError: emailErrorMessage,
      passwordError: passwordErrorMessage,
    };
  }
};

export const GetMongoUserByUID = async (UID: string) => {
  try {
    const response = await axios.get(apiUrl + "/user", {
      params: {
        UID: UID,
      },
    });
    const user = response.data.user;
    console.log(user);
    if (!user) {
      console.log("No mongo user found");
    }
    return user;
  } catch (error) {
    console.log("error finding mongo user:" + error);
    return null;
  }
};

export const ToggleFavorite = async (UID: string, recipeId: string) => {
  try {
    const response = await axios.post(apiUrl + "/recipe/favorite", {
      UID: UID,
      recipeId: recipeId,
    });

    return { success: true, favorited: response.data.favorited };
  } catch (error) {
    console.log("error favoriting recipe:" + error);
    return { success: false };
  }
};

export const CheckIfFavorited = async (UID: string, recipeId: string) => {
  try {
    const user = await GetMongoUserByUID(UID);
    const favorited = user.favoriteRecipeIds.includes(recipeId);

    return { success: true, favorited: favorited };
  } catch (error) {
    console.log("error checking if favorited:" + error);
    return { success: false };
  }
};

export const GetCurrentUID = () => {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  } else {
    return "";
  }
};
