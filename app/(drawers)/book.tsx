import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import Card from "../card";
import axios from "axios";

const book = () => {
  //copied over code to experiment
  const apiUrl = "http://localhost:5000/api/recipes";

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

  return (
    <ScrollView>
      <View style={styles.container}>
        {recipes.map((recipe, index) => (
          <View key={index} style={styles.recipePreview}>
            <Text style={styles.header}>{recipe.title}</Text>
            <Text>{recipe.description}</Text>
            <Button title="View Recipe" />
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
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
  },

  recipePreview: {
    marginBottom: 30,
  },

  header: {
    fontSize: 26,
  },
});
