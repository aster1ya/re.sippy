import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const Details = () => {
  const apiUrl = "http://localhost:5000/api/recipe";

  const { id } = useLocalSearchParams();

  const [recipe, setRecipe] = useState();

  const fetchRecipe = () => {
    axios
      .get(apiUrl, {
        params: {
          recipeId: id,
        },
      })
      .then((response) => {
        const recipes = response.data;
        setRecipe(recipes[0]);
        console.log("recipes gotten");
      })
      .catch((e) => {
        console.log(e);
      });
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
