import React, { useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CreateRecipeRequest } from "../controller";
import axios from "axios";
import IRecipe from "@/types/Recipe";
import styles from "../styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { auth } from "@/backend/firebaseConfig";

type RecipeInputProps = {
  //recipe ??
  successAlertHandler: (newRecipeId: string) => void;
  failAlertHandler: (message: string) => void;
};

const RecipeInput = ({
  successAlertHandler,
  failAlertHandler,
}: RecipeInputProps) => {
  const router = useRouter();

  //good candidate for code review here ############
  //the whole deal of passing variables from here to controller could be done better: allow for undefined the whole way? To do that, ditch having IRecipe as the interface when calling CreateRecipeRequest. Just have it be a bunch of variables which may be undefined and have the default values of IRecipe catch the undefined (but you still have to catch null and "" yourself)

  //all these useStates could probably be replaced by a single Recipe class
  const [title, setTitle] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");
  const [mealType, setMealType] = useState<string | undefined>("");
  const [prepTime, setPrepTime] = useState<string | undefined>("");
  const [cookTime, setCookTime] = useState<string | undefined>("");
  const [servings, setServings] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [notes, setNotes] = useState<string | undefined>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleCreateRecipe = () => {
    UploadRecipe();
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
      authorId: authorId,
      mealType: mealType,
      prepTime: prepTime,
      cookTime: cookTime,
      servings: servings,
      description: description,
      ingredients: ingredients,
      instructions: instructions,
      notes: notes,
      tags: tags,
    });

    if (success) {
      console.log("Recipe created: " + recipe.title);
      router.back();
      successAlertHandler(recipe._id);
    } else {
      if (missingFields.length > 0) {
        let message =
          "Please fill the following fields:\n" + missingFields.join(", ");
        failAlertHandler(message);
      } else {
        failAlertHandler("backend error");
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
                <Text style={styles.infoLabel}>Type</Text>
                <TextInput
                  placeholder="None"
                  inputMode="text"
                  onChangeText={(newText) => setMealType(newText)}
                  style={styles.infoField}
                />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Prep Time</Text>
                <TextInput
                  placeholder="None"
                  inputMode="text"
                  onChangeText={(newText) => setPrepTime(newText)}
                  style={styles.infoField}
                />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Cook Time</Text>
                <TextInput
                  placeholder="None"
                  inputMode="text"
                  onChangeText={(newText) => setCookTime(newText)}
                  style={styles.infoField}
                />
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Servings</Text>
                <TextInput
                  placeholder="0"
                  inputMode="numeric"
                  onChangeText={(newText) => setServings(newText)}
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
              placeholder="Instructions"
              onChangeText={(newText) => setInstructions(newText)}
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
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Notes</Text>
            <TextInput
              placeholder="Cook time"
              onChangeText={(newText) => setCookTime(newText)}
            />
          </View>
        </View>

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
          onPress={(isChecked: boolean) => updateTagList(isChecked, "Vegan")}
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
          onPress={(isChecked: boolean) => updateTagList(isChecked, "Halal")}
        ></BouncyCheckbox>

        <Button
          color="tomato"
          title="Create Recipe"
          onPress={handleCreateRecipe}
        />
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default RecipeInput;
