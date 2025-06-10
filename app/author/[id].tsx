import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SearchRecipes } from "@/controller";
import { useLocalSearchParams } from "expo-router";
import IRecipe from "@/types/Recipe";
import RecipeList from "@/components/RecipeList";
import styles from "../../styles";

const AuthorRecipes = () => {
  const { id, name } = useLocalSearchParams();
  const authorId = Array.isArray(id) ? id[0] : id;
  const authorName = Array.isArray(name) ? name[0] : name;
  
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthorRecipes = async () => {
    try {
      setLoading(true);
      const authorRecipes = await SearchRecipes({ authorId });
      setRecipes(authorRecipes || []);
    } catch (error) {
      console.error("Error fetching author recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorRecipes();
  }, [authorId]);

  return (
    <SafeAreaView style={styles.searchSafeArea}>
      <ScrollView>
        <View style={styles.bookContainer}>
          <Text style={styles.bookTitle}>Recipes by {authorName}</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#417023" />
          ) : recipes.length === 0 ? (
            <Text style={styles.searchNoResult}>No recipes found for this author.</Text>
          ) : (
            <RecipeList recipes={recipes} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthorRecipes;