import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import IRecipe from "../../types/Recipe";
import { GetRecipeById } from "../../controller";

const Details = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState<IRecipe>();

  const fetchRecipe = async () => {
    const idStr = Array.isArray(id) ? id[0] : id;
    const recipe = await GetRecipeById(idStr);
    if (recipe) {
      setRecipe(recipe);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

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
    <View style={styles.container}>
      <Text style={styles.heading}>Details</Text>
      <Text>Recipe ID: {recipe?._id}</Text>
      <Text>Title: {recipe?.title}</Text>
      <Text>Description: {recipe?.description}</Text>
      <Text>Ingredients: {recipe?.ingredients}</Text>
      <Text>Instructions: {recipe?.instructions}</Text>

      <View style={styles.buttonWrapper}>
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
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