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
import styles from "../styles";
import { CreateRecipeRequest } from "../controller";

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

  const getvalues = () => {
    return [3, 7];
  };

  const [first, second] = getvalues();

  const UploadRecipe = async () => {
    const [success, recipe] = await CreateRecipeRequest(
      title,
      description,
      ingredients,
      instructions
    );

    if (success) {
      console.log("Recipe created: " + recipe.title);
      showCreatedRecipeAlert();

      router.replace("/book");
      router.push({
        pathname: "/recipe_details/[id]",
        params: { id: recipe._id },
      });
    } else {
      showFailedToCreateRecipeAlert();
      console.log("Recipe not created");
    }
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

export default CreateRecipe;
