import React, { useState, useEffect } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GetRecipeById } from "../../controller";
import axios from "axios";
import IRecipe from "@/types/Recipe";
import styles from "../../styles";

const EditRecipe = () => {
  //establish connection to API to pull recipe data
  const apiUrl = "http://localhost:5000/api/recipes";
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const [recipe, setRecipe] = useState<IRecipe>();

  const [title, setTitle] = useState<string>("");
  const [authorId, setAuthor] = useState<string>("");
  const [mealType, setType] = useState<string>("");
  const [prepTime, setPrep] = useState<string>("");
  const [cookTime, setCook] = useState<string>("");
  const [servings, setServe] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const fetchRecipe = async () => {
    console.log(id);
    const idStr = Array.isArray(id) ? id[0] : id; //handle if multiple IDs are given, take the first one
    const recipe = await GetRecipeById(idStr);
    console.log("edit recipe: " + recipe);
    if (recipe) {
      setRecipe(recipe);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, []);

  const showUpdatedRecipeAlert = () => {
    Alert.alert("success", "Recipe has been successfully updated.");
  };

  const showFailedToUpdateAlert = () => {
    Alert.alert("failed", "Recipe has not been updated. Please try again.");
  };

  const UploadRecipe = async () => {
    const newRecipe: IRecipe = {
      title: title,
      authorId: authorId,
      mealType: mealType,
      prepTime: prepTime,
      cookTime: cookTime,
      servings: servings,
      description: description,
      ingredients: ingredients,
      instructions: instructions,
      notes: notes,
      tags: [""],
    };
    //
  };

  //for a (potential) function to dynamically add TextInput components
  //const [inputRow, setInputRow] = useState([]);

  //render the layout of the recipe editor
  return (
    <SafeAreaProvider>
      {isLoading ? (
        <View>
          <Text>Loading</Text>
          <Text>{recipe?.title}</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.baseContainer}>
            <View>
              <TextInput
                autoCapitalize="words"
                defaultValue={recipe?.title || "N/A"}
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
                    defaultValue={recipe?.authorId || "N/A"}
                    inputMode="text"
                    onChangeText={(newText) => setAuthor(newText)}
                    style={styles.infoField}
                  />
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.infoLabel}>Type</Text>
                  <TextInput
                    defaultValue={recipe?.mealType || "N/A"}
                    inputMode="text"
                    onChangeText={(newText) => setType(newText)}
                    style={styles.infoField}
                  />
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.infoLabel}>Prep Time</Text>
                  <TextInput
                    defaultValue={recipe?.prepTime || "N/A"}
                    inputMode="text"
                    onChangeText={(newText) => setPrep(newText)}
                    style={styles.infoField}
                  />
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.infoLabel}>Cook Time</Text>
                  <TextInput
                    defaultValue={recipe?.cookTime || "N/A"}
                    inputMode="text"
                    onChangeText={(newText) => setCook(newText)}
                    style={styles.infoField}
                  />
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.infoLabel}>Servings</Text>
                  <TextInput
                    defaultValue={recipe?.servings || "0"}
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
                defaultValue={recipe?.description || "N/A"}
                onChangeText={(newText) => setDescription(newText)}
              />
            </View>
          </View>

          <View style={styles.baseContainer}>
            <View style={styles.baseSubContainer}>
              <Text style={styles.h1}>Ingredients</Text>
              <TextInput
                defaultValue={recipe?.ingredients || "N/A"}
                onChangeText={(newText) => setIngredients(newText)}
              />
              {/*
                        <Button
                            color="tomato"
                            title="Add New Ingredient"
                        />
                        */}
            </View>
          </View>

          <View style={styles.baseContainer}>
            <View style={styles.baseSubContainer}>
              <Text style={styles.h1}>Instructions</Text>
              <TextInput
                defaultValue={recipe?.instructions || "N/A"}
                onChangeText={(newText) => setInstructions(newText)}
              />
              {/*
                        <Button
                            color="tomato"
                            title="Add New Step"
                        />
                        */}
            </View>
          </View>

          <View style={styles.baseContainer}>
            <View style={styles.baseSubContainer}>
              <Text style={styles.h1}>Notes</Text>
              <TextInput
                defaultValue={recipe?.notes || "N/A"}
                onChangeText={(newText) => setNotes(newText)}
              />
              {/*
                        <Button
                            color="tomato"
                            title="Add New Note"
                        />
                        */}
            </View>
          </View>

          <Button
            color="tomato"
            title="Save Recipe"
            //onPress=
          />
        </ScrollView>
      )}
    </SafeAreaProvider>
  );
};

export default EditRecipe;
