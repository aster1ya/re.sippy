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
import { useIsFocused } from "@react-navigation/native";

const favorites = () => {
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const isFocused = useIsFocused();

  const getFavoriteRecipes = async () => {
    console.log("aaaaaa");
    if (auth.currentUser) {
      const recipes = await SearchRecipes({
        favoriteUserId: auth.currentUser.uid,
      });
      if (recipes) {
        setRecipeList(recipes);
      }
    }
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, [isFocused]);

  return (
    <ScrollView>
      {recipeList.length == 0 ? (
        <Text>You have no favorite recipes</Text>
      ) : (
        <RecipeList recipes={recipeList} />
      )}
    </ScrollView>
  );
};

export default favorites;
