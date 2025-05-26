import { Text, StyleSheet, View, Button } from "react-native";
import React, { Component } from "react";
import IRecipe from "../types/Recipe";
import { useRouter } from "expo-router";

type RecipeListProps = {
  recipes: IRecipe[];
};

const RecipeList = ({ recipes }: RecipeListProps) => {
  const router = useRouter();

  const goToRecipe = (recipeId: string) => {
    router.push({
      pathname: "/recipe_details/[id]",
      params: { id: recipeId },
    });
  };

  return (
    <View style={styles.container}>
      {recipes && recipes != undefined ? (
        recipes.map((recipe, index) => (
          <View key={index} style={styles.recipePreview}>
            <View style={styles.row}>
              <Text style={styles.header}>{recipe.title}</Text>
              <Button
                title="View Recipe"
                onPress={() => goToRecipe(recipe._id)}
              />
            </View>
            <Text>{recipe.description}</Text>
          </View>
        ))
      ) : (
        <Text>No Recipes</Text>
      )}
    </View>
  );
};

export default RecipeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },

  recipePreview: {
    marginBottom: 30,
    backgroundColor: "#e0e0e0",
    padding: 10,
  },

  header: {
    fontSize: 26,
  },

  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
});
