import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useFocusEffect, useRouter } from "expo-router";
import Card from "./card";
import axios from "axios";
import { ToggleFavorite, SearchRecipes } from "../controller";
import IRecipe from "../types/Recipe";
import RecipeList from "../components/RecipeList";
import { auth } from "../backend/firebaseConfig";
import styles from "../styles";

const favorites = () => {
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);

  const getFavoriteRecipes = async () => {
    if (auth.currentUser) {
      const recipes = await SearchRecipes({
        favoriteUserId: auth.currentUser.uid,
      });
      if (recipes) {
        setRecipeList(recipes);
      }
    }
  };

  useFocusEffect(() => {
    getFavoriteRecipes();
  });

  return (
    <ScrollView>
      <RecipeList recipes={recipeList} />
    </ScrollView>
  );
};

export default favorites;
