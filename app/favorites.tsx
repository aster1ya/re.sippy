import React, { useEffect, useState } from "react";
import {
  Button, 
  Text,
  ScrollView,
  View,
} from "react-native";
import { ToggleFavorite, SearchRecipes } from "../controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

import { auth } from "../backend/firebaseConfig";

import IRecipe from "../types/Recipe";
import RecipeList from "../components/RecipeList";
import styles from "../styles";

const Favorites = () => {
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const isFocused = useIsFocused();

  const getFavoriteRecipes = async () => {
    console.log("******");
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
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.bookContainer}>
          {recipeList.length == 0 ? (
            <Text>You have no favorited recipes.</Text>
          ) : (
            <RecipeList recipes={recipeList}/>
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Favorites;
