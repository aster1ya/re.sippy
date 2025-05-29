import React, { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CreateRecipeRequest } from "../controller";
import axios from "axios";
import IRecipe from "@/types/Recipe";
import styles from "../styles";

const CreateRecipe = () => {
  const apiUrl = "http://localhost:5000/api/recipes";
  const router = useRouter();

  //all these useStates could probably be replaced by a single Recipe class
  const [title, setTitle] = useState<String>("");
  const [authorId, setAuthor] = useState<String>("");
  const [mealType, setType] = useState<String>("");
  const [prepTime, setPrep] = useState<String>("");
  const [cookTime, setCook] = useState<String>("");
  const [totalTime, setTotal] = useState<String>("");
  const [servings, setServe] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [ingredients, setIngredients] = useState<String>("");
  const [instructions, setInstructions] = useState<String>("");
  const [notes, setNotes] = useState<String>("");

  const handleCreateRecipe = () => {
    UploadRecipe();
  };

  const showCreatedRecipeAlert = () => {
    Alert.alert("success", "Recipe has been successfully created.");
  };

  const showFailedToCreateRecipeAlert = () => {
    Alert.alert("failed", "Recipe has not been created. Please enter a title.");
  };

  const getvalues = () => {
    return [3, 7];
  };

  const [first, second] = getvalues();

  const UploadRecipe = async () => {
    const newRecipe : IRecipe = {
      title: title,
      authorId: authorId,
      mealType: mealType,
      prepTime: prepTime,
      cookTime: cookTime,
      totalTime: totalTime,
      servings: servings,
      description: description,
      ingredients: ingredients,
      instructions: instructions,
      notes: notes,
      tags: [""],
    }
    const [success, recipe] = await CreateRecipeRequest(newRecipe);

    if (success) {
      console.log("Recipe created: " + recipe.title + ".");
      showCreatedRecipeAlert();

      router.replace("/book");
      router.push({
        pathname: "/recipe_details/[id]",
        params: { id: recipe._id },
      });
    } else {
      showFailedToCreateRecipeAlert();
      console.log("Recipe was not created.");
    }
  };

  //for a (potential) function to dynamically add TextInput components
  const [inputRow, setInputRow] = useState([]);

  //render the layout of the recipe creator
  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.baseContainer}>
          <View>
            <TextInput
              autoCapitalize="words"
              placeholder="New Recipe"
              inputMode="text"
              onChangeText={(newText) => setTitle(newText)}
              style={styles.createTitle}
            />
          </View>

          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Author</Text>
                <TextInput
                  placeholder="You"
                  inputMode="text"
                  onChangeText={(newText) => setAuthor(newText)}
                  style={styles.infoField}
                />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Type</Text>
                <TextInput
                  placeholder="None"
                  inputMode="text"
                  onChangeText={(newText) => setType(newText)}
                  style={styles.infoField}
                />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Prep Time</Text>
                <TextInput
                  placeholder="None"
                  inputMode="text"
                  onChangeText={(newText) => setPrep(newText)}
                  style={styles.infoField}
                  />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Cook Time</Text>
                <TextInput
                  placeholder="None"
                  inputMode="text"
                  onChangeText={(newText) => setCook(newText)}
                  style={styles.infoField}
                />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Total Time</Text>
                <TextInput
                  placeholder="None"
                  inputMode="text"
                  onChangeText={(newText) => setTotal(newText)}
                  style={styles.infoField}
                />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Servings</Text>
                <TextInput
                  placeholder="0"
                  inputMode="numeric"
                  onChangeText={(newText) => setServe(newText)}
                  style={styles.infoField}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Description</Text>
            <TextInput
              multiline={true}
              placeholder="Description"
              onChangeText={(newText) => setDescription(newText)}
            />
          </View>
        </View>
          
        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Ingredients</Text>
            <TextInput
              placeholder="Ingredients"
              onChangeText={(newText) => setIngredients(newText)}
            />
            <Button
              color="tomato"
              title="Add New Ingredient"
            />
          </View>
        </View>
          
        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Instructions</Text>
            <TextInput
              placeholder="Instructions"
              onChangeText={(newText) => setInstructions(newText)}
            />
            <Button
              color="tomato"
              title="Add New Step"
            />
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Notes</Text>
              <TextInput
                placeholder="Note"
                onChangeText={(newText) => setNotes(newText)}
              />
              <Button
                color="tomato"
                title="Add New Note"
              />
          </View>
        </View>

        <Button
          color="tomato"
          title="Create Recipe"
          onPress={handleCreateRecipe}
        />
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default CreateRecipe;
