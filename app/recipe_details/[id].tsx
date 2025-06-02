import React, { useState, useEffect } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import IRecipe from "../../types/Recipe";

import { GetRecipeById } from "../../controller";
import IRecipe from "@/types/Recipe";
import styles from "../../styles";
import { useIsFocused } from "@react-navigation/native";

const Details = () => {
  const isFocused = useIsFocused();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<IRecipe>();

  const fetchRecipe = async () => {
    console.log("id test");
    console.log("id: " + id);

    const idStr = Array.isArray(id) ? id[0] : id;
    const recipe = await GetRecipeById(idStr);
    if (recipe) {
      setRecipe(recipe);
    }
  };
  useEffect(() => {
    if (isFocused) {
      fetchRecipe();
    }
  }, [isFocused]);

  const goToRecipe = (recipeId: string) => {
    router.push({
      pathname: "/recipe_details/edit",
      params: { id: recipeId },
    });
  };

  const handleDelete = async () => {
    const idStr = Array.isArray(id) ? id[0] : id;
    Alert.alert("Delete Recipe", "Are you sure you want to delete this recipe?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://localhost:5000/api/recipes/${idStr}`);
            Alert.alert("Deleted!", "Recipe successfully deleted.");
            router.back();
          } catch (error) {
            console.error("Delete failed:", error);
            Alert.alert("Error", "Could not delete recipe.");
          }
        },
      },
    ]);
  };

  return (

    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.baseContainer}>
          <View>
            {/* <Text>Recipe has ID: {id}</Text> */}
            <Text style={styles.baseTitle}>{recipe?.title}</Text>
          </View>

          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Author</Text>
                <Text>{recipe?.authorId}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text>{recipe?.mealType}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Prep Time</Text>
                <Text>{recipe?.prepTime}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Cook Time</Text>
                <Text>{recipe?.cookTime}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Servings</Text>
                <Text>{recipe?.servings}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Description</Text>
            <Text>{recipe?.description}</Text>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Ingredients</Text>
            <Text>{recipe?.ingredients}</Text>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Instructions</Text>
            <Text>{recipe?.instructions}</Text>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Notes</Text>
            <Text>{recipe?.notes}</Text>
          </View>
        </View>

        <Button
          color="tomato"
          title="Edit Recipe"
          onPress={() => goToRecipe(Array.isArray(id) ? id[0] : id)}
        />
      </ScrollView>
    </SafeAreaProvider>

    <View style={localStyles.container}>
      <Text style={localStyles.heading}>Details</Text>
      <Text>Recipe ID: {recipe?._id}</Text>
      <Text>Title: {recipe?.title}</Text>
      <Text>Description: {recipe?.description}</Text>
      <Text>Ingredients: {recipe?.ingredients}</Text>
      <Text>Instructions: {recipe?.instructions}</Text>

      <View style={localStyles.buttonWrapper}>
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>

  );
};

export default Details;

const localStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  buttonWrapper: {
    marginTop: 30,
  },
});

