import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import IRecipe from "../../types/Recipe";
import { GetRecipeById } from "../../controller";

const Details = () => {
  const apiUrl = "http://localhost:5000/api/recipe";

  const { id } = useLocalSearchParams();

  const [recipe, setRecipe] = useState<IRecipe>();

  const fetchRecipe = async () => {
    const idStr = Array.isArray(id) ? id[0] : id; //handle if multiple IDs are given, take the first one
    const recipe = await GetRecipeById(idStr);
    if (recipe) {
      setRecipe(recipe);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <View>
      <Text>Details</Text>
      {/* <Text>Recipe has ID: {id}</Text> */}
      <Text>Recipe has ID: {recipe?._id}</Text>
      <Text>Title: {recipe?.title}</Text>
      <Text>Description: {recipe?.description}</Text>
      <Text>Ingredients: {recipe?.ingredients}</Text>
      <Text>Instructions: {recipe?.instructions}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
