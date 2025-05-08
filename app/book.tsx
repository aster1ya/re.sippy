import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import Card from "./card";
import axios from "axios";

const book = () => {
  const apiUrl = "http://localhost:5000/api/recipes";
  const router = useRouter();

  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(apiUrl);
      setRecipes(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const goToRecipe = (recipeId: string) => {
    router.push({
      pathname: "/recipe_details/[id]",
      params: { id: recipeId },
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>All Recipes</Text>
        {recipes.map((recipe, index) => (
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
        ))}
      </View>
    </ScrollView>
  );
};

export default book;

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

  title: {
    fontSize: 30,
    alignSelf: "center",
    margin: 15,
  },

  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
});
