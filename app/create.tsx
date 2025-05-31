import React, { useState, useEffect } from "react";
import {
  ScrollView,
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
//import styles from "../styles";
import { CreateRecipeRequest } from "../controller";
import styles from "../styles";
import { auth } from "@/backend/firebaseConfig";
const CreateRecipe = () => {
  const apiUrl = "http://localhost:5000/api/recipes";
  const router = useRouter();

  //good candidate for code review here ############
  //the whole deal of passing variables from here to controller could be done better: allow for undefined the whole way? To do that, ditch having IRecipe as the interface when calling CreateRecipeRequest. Just have it be a bunch of variables which may be undefined and have the default values of IRecipe catch the undefined (but you still have to catch null and "" yourself)

  //All these useStates could probably be replaced by a single Recipe class
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [cookTime, setCookTime] = useState<string>("");
  const [rating, setRating] = useState<number>();
  const [difficulty, setDifficulty] = useState<string>("");

  const handleCreateRecipe = () => {
    UploadRecipe();
  };

  const showCreatedRecipeAlert = (newRecipeId: string) => {
    Alert.alert("Success", "Recipe has been successfully created.", [
      {
        text: "View Recipe",
        onPress: () => {
          router.push("/book");
          router.push({
            pathname: "/recipe_details/[id]",
            params: { id: newRecipeId },
          });
        },
      },
      {
        text: "OK",
      },
    ]);
  };

  const showFailedToCreateRecipeAlert = (message: string) => {
    Alert.alert("Failed to create recipe", "Recipe not created. " + message);
  };

  const updateTagList = (enable: boolean, tag: string) => {
    let newTags = [...tags];

    if (enable) {
      if (!tags.includes(tag)) {
        newTags.push(tag);
        setTags(newTags);
      }
    } else {
      newTags = newTags.filter((item) => item != tag);
      setTags(newTags);
    }
  };

  const UploadRecipe = async () => {
    const authorId = auth.currentUser ? auth.currentUser.uid : "";

    const { success, recipe, missingFields } = await CreateRecipeRequest({
      title: title,
      description: description,
      ingredients: ingredients,
      instructions: instructions,
      authorId: authorId,
      tags: tags,
      cookTime: cookTime,
      difficulty: difficulty,
      rating: rating,
    });

    if (success) {
      console.log("Recipe created: " + recipe.title);
      router.back();
      showCreatedRecipeAlert(recipe._id);
    } else {
      if (missingFields.length > 0) {
        let message =
          "Please fill the following fields:\n" + missingFields.join(", ");
        showFailedToCreateRecipeAlert(message);
      } else {
        showFailedToCreateRecipeAlert("backend error");
      }
      console.log("Recipe not created");
    }
  };

  //render the layout of the recipe creator
  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.baseContainer}>
          <View>
            <TextInput
              autoCapitalize="words"
              defaultValue="New Recipe"
              inputMode="text"
              style={styles.createTitle}
            />
          </View>

          <View style={styles.baseSubContainer}>
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

          <View style={styles.baseSubContainer}>
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

            <Text>CookTime</Text>
            <TextInput
              placeholder="cooktime..."
              onChangeText={(newText) => setCookTime(newText)}
            />

            <Text>Difficulty</Text>
            <TextInput
              placeholder="difficulty..."
              onChangeText={(newText) => setDifficulty(newText)}
            />

            <Text>Tags</Text>
            <BouncyCheckbox
              text="Vegetarian"
              textStyle={{ fontSize: 14, textDecorationLine: "none" }}
              textContainerStyle={{ marginVertical: 5 }}
              onPress={(isChecked: boolean) =>
                updateTagList(isChecked, "Vegetarian")
              }
            ></BouncyCheckbox>
            <BouncyCheckbox
              text="Vegan"
              textStyle={{ fontSize: 14, textDecorationLine: "none" }}
              textContainerStyle={{ marginVertical: 5 }}
              onPress={(isChecked: boolean) =>
                updateTagList(isChecked, "Vegan")
              }
            ></BouncyCheckbox>
            <BouncyCheckbox
              text="Gluten Free"
              textStyle={{ fontSize: 14, textDecorationLine: "none" }}
              textContainerStyle={{ marginVertical: 5 }}
              onPress={(isChecked: boolean) =>
                updateTagList(isChecked, "Gluten Free")
              }
            ></BouncyCheckbox>
            <BouncyCheckbox
              text="Halal"
              textStyle={{ fontSize: 14, textDecorationLine: "none" }}
              textContainerStyle={{ marginVertical: 5 }}
              onPress={(isChecked: boolean) =>
                updateTagList(isChecked, "Halal")
              }
            ></BouncyCheckbox>
            <Button title="Create Recipe" onPress={handleCreateRecipe} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default CreateRecipe;
