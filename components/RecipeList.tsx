import React, { Component } from "react";
import { 
  Button,
  StyleSheet, 
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import IRecipe from "../types/Recipe";

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
    <View style={styles.listContainer}>
      {recipes && recipes != undefined ? (
        recipes.map((recipe, index) => (
          <View key={index} style={styles.recipePreview}>
            <View style={styles.row}>
              <Text style={styles.header}>{recipe.title}</Text>
              <Button
                color="tomato"
                title="View Recipe"
                onPress={() =>
                  goToRecipe(
                    recipe._id ||
                      "recipe.id will never be undefined so this is just for error suppression"
                  )}
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
  listContainer: {
    backgroundColor:"white",
    borderColor:"white",
    borderRadius:10,
    borderWidth:2.5,
    flex: 1,
    justifyContent:"center",
    margin:5,
    padding:5,
  },

  recipePreview: {
    backgroundColor:"#e0e0e0",
    marginTop:10,
    marginBottom:10,
    padding:10,
  },

  header: {
    fontSize: 26,
  },

  row: {
    flexDirection:"row",
    display:"flex",
    justifyContent:"space-between",
  },
});
