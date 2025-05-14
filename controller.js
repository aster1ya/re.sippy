import axios from "axios";

const apiUrl = "http://localhost:5000/api";


//returns all recipes. for recipe book page
export const GetAllRecipes = async () => {
    try {
        const response =  await axios.get(apiUrl + "/recipes");
        console.log("success")
        return response.data;
    } catch (error) {
        console.log("failed to get all recipes")
        console.log(error);
        return null;
    };
};

//returns one recipe. for detail page
export const GetRecipeById = async (id) => {
    try {
        const response = await axios.get(apiUrl + "/recipe", {
            params: {
                recipeId: id,
            },
        })
        const recipe = response.data[0];
        return recipe;

    } catch(error) {
        console.log("failed to get recipe by id")
        console.log(error);
        return null;
    };
};

//creates recipe. returns if it was successful or not. for create page.
export const CreateRecipeRequest = async (title, description, ingredients, instructions) => {
    try {
        const response = await axios.post(apiUrl + "/recipes", {
            title: title,
            description: description,
            ingredients: ingredients,
            instructions: instructions,
          })

        return [ response.data.success, response.data.recipe ];

        } catch(error) {
            console.log("failed to create recipe");
            console.log(error);
            return [false, null];
        };
}