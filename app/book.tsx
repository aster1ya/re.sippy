import React, { useEffect, useState } from "react";
import { 
  Button,
  Text, 
  ScrollView,
  View, 
} from "react-native";
import { 
  GetAllRecipes, 
  SearchRecipes,
} from "../controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

import { auth } from "@/backend/firebaseConfig";
import { useRouter } from "expo-router";

import IRecipe from "../types/Recipe";
import RecipeList from "../components/RecipeList";
import styles from "../styles";

const Book = () => {
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

  const goToFavorites = () => {
    router.push({
      pathname: "/favorites",
    })
  }

  const goToLogin = () => {
    router.push({
      pathname: "/login",
    })
  }

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.bookContainer}>
          <Text style={styles.bookTitle}>All Recipes</Text>
          <RecipeList recipes={recipes}/>
        </View>

          {auth.currentUser ? (
            <View style={styles.longButton}>
              <Button
                title="Go to Favorites"
                color="tomato"
                onPress={goToFavorites}
              />
            </View>
          ) : (
            <View style={styles.longButton}>
              <Button
                title="Login to View Favorites"
                color="tomato"
                onPress={goToLogin}
              />
            </View>
          )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Book;
