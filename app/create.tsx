import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const CreateRecipe = () => {
  const apiUrl = "http://localhost:5000/api/recipes";
  const router = useRouter();

  //All these useStates could probably be replaced by a single Recipe class
  const [title, setTitle] = useState<String | null>(null);
  const [description, setDescription] = useState<String | null>(null);
  const [ingredients, setIngredients] = useState<String | null>(null);
  const [instructions, setInstructions] = useState<String | null>(null);

  const handleCreateRecipe = () => {
    UploadRecipe();
  };

  const showCreatedRecipeAlert = () => {
    Alert.alert("success", "Recipe has been successfully created");
  };

  const showFailedToCreateRecipeAlert = () => {
    Alert.alert("failed", "Recipe not created. Please enter a title");
  };

  const UploadRecipe = () => {
    axios
      .post(apiUrl, {
        title: title,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Recipe created: " + response.data.recipe.title);
          showCreatedRecipeAlert();
          router.replace("/book");
          router.push({
            pathname: "/recipe_details/[id]",
            params: { id: response.data.recipe._id },
          });
        } else {
          showFailedToCreateRecipeAlert();
          console.log("Recipe not created");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //render the layout of the recipe creator
  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <TextInput
              autoCapitalize="words"
              defaultValue="New Recipe"
              inputMode="text"
              style={styles.title}
            />
          </View>

          <View style={styles.subContainer}>
            <Text style={styles.h1}>Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Author</Text>
                <TextInput
                  defaultValue="N/A"
                  inputMode="text"
                  style={styles.infoField}
                />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Category</Text>
                <TextInput
                  defaultValue="N/A"
                  inputMode="text"
                  style={styles.infoField}
                />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Prep Time</Text>
                <Text>N/A</Text>
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Cook Time</Text>
                <Text>N/A</Text>
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Total Time</Text>
                <Text>N/A</Text>
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Servings</Text>
                <Text>N/A</Text>
              </View>
            </View>
          </View>

          <View style={styles.subContainer}>
            <Text>Title</Text>
            <TextInput
              placeholder="title..."
              onChangeText={(newText) => setTitle(newText)}
            />

            <Text>Description</Text>
            <TextInput
              placeholder="description..."
              onChangeText={(newText) => setDescription(newText)}
            />

            <Text>Ingredients</Text>
            <TextInput
              placeholder="ingredients..."
              onChangeText={(newText) => setIngredients(newText)}
            />

            <Text>Instructions</Text>
            <TextInput
              placeholder="instructions..."
              onChangeText={(newText) => setInstructions(newText)}
            />

            <Button title="Create Recipe" onPress={handleCreateRecipe} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

//stylesheet for UI components/*
const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightsalmon",
    borderColor: "lightsalmon",
    borderRadius: 10,
    borderWidth: 2.5,
    flex: 1,
    margin: 10,
    padding: 10,
  },
  subContainer: {
    backgroundColor: "whitesmoke",
    borderColor: "whitesmoke",
    borderRadius: 5,
    borderWidth: 5,
    padding: 10,
  },
  title: {
    flex: 1,
    flexDirection: "row",
    fontSize: 30,
    //fontWeight: 10, why does this live cause an error
    paddingBottom: 20,
    textAlign: "center",
  },
  h1: {
    fontSize: 26,
    paddingBottom: 10,
    textAlign: "center",
  },
  infoGrid: {
    alignItems: "flex-start",
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 18,
    margin: 10,
  },
  infoSection: {
    alignItems: "center",
    padding: 5,
    width: "50%",
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoField: {
    marginTop: -10,
  },
});
export default CreateRecipe;
