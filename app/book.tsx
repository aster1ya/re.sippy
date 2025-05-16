import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import Card from "./card";
import axios from "axios";
import { GetAllRecipes, SearchRecipes } from "../controller";
import IRecipe from "../types/Recipe";
import RecipeList from "../components/RecipeList";

const book = () => {
  const apiUrl = "http://localhost:5000/api/recipes";
  const router = useRouter();

  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  //get recipes and set them if request is successful.
  const fetchAllRecipes = async () => {
    const allRecipes = await GetAllRecipes();
    if (allRecipes) {
      setRecipes(allRecipes);
    }
  };
  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const goToRecipe = (recipeId: string) => {
    router.push({
      pathname: "/recipe_details/[id]",
      params: { id: recipeId },
    });
  };

  return (
    <ScrollView>
      <Text style={styles.title}>All Recipes</Text>
      <RecipeList recipes={recipes} title="All Recipes" />
    </ScrollView>
  );
};

export default book;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    alignSelf: "center",
    margin: 15,
  },
});
