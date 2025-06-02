import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useFocusEffect, useRouter } from "expo-router";
import Card from "./card";
import axios from "axios";
import { GetAllRecipes, SearchRecipes } from "../controller";
import IRecipe from "../types/Recipe";
import RecipeList from "../components/RecipeList";
import styles from "../styles";
import { auth } from "@/backend/firebaseConfig";
import { useIsFocused } from "@react-navigation/native";

const book = () => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  //get recipes and set them if request is successful.
  const fetchAllRecipes = async () => {
    const allRecipes = await GetAllRecipes();
    if (allRecipes) {
      setRecipes(allRecipes);
    }
  };
  useEffect(() => {
    if (isFocused) {
      fetchAllRecipes();
    }
  }, [isFocused]);

  const goToRecipe = (recipeId: string) => {
    router.push({
      pathname: "/recipe_details/[id]",
      params: { id: recipeId },
    });
  };

  return (
    <ScrollView>
      <Text style={styles.bookTitle}>All Recipes</Text>
      <RecipeList recipes={recipes} />

      {auth.currentUser ? (
        <Link href="/favorites" style={styles.hyperlink}>
          Go To Favorites
        </Link>
      ) : (
        <Text>Login to view favorites</Text>
      )}
    </ScrollView>
  );
};

export default book;
