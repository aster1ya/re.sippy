import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import IRecipe from "../../types/Recipe";
import {
  GetRecipeById,
  GetCurrentUID,
  CheckIfFavorited,
} from "../../controller";
import FavoriteStar from "@/components/FavoriteStar";

const Details = () => {
  const apiUrl = "http://localhost:5000/api/recipe";

  const { id } = useLocalSearchParams();
  const recipeId = Array.isArray(id) ? id[0] : id; //handle if multiple IDs are given, take the first one

  const [recipe, setRecipe] = useState<IRecipe>();
  const [favorited, setFavorited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const uid = GetCurrentUID();

  const fetchRecipe = async () => {
    const recipe = await GetRecipeById(recipeId);
    if (recipe) {
      setRecipe(recipe);
    }
  };

  const fetchFavorited = async () => {
    const { favorited } = await CheckIfFavorited(uid, recipeId);
    setFavorited(favorited);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  useEffect(() => {
    fetchFavorited();
  });

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#417023"
        style={{ marginTop: 40 }}
      />
    );

  return (
    <View>
      <Text>Details</Text>
      {/* <Text>Recipe has ID: {id}</Text> */}
      <Text>Recipe has ID: {recipe?._id}</Text>
      <Text>Title: {recipe?.title}</Text>
      <Text>Description: {recipe?.description}</Text>
      <Text>Ingredients: {recipe?.ingredients}</Text>
      <Text>Instructions: {recipe?.instructions}</Text>
      <FavoriteStar
        recipeId={recipeId}
        uid={uid}
        isFavorited={favorited}
      ></FavoriteStar>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
