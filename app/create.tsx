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
import RecipeInput from "../components/RecipeInput";

const CreateRecipe = () => {
  const router = useRouter();

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

  return (
    <SafeAreaProvider>
      <View>
        <RecipeInput
          successAlertHandler={showCreatedRecipeAlert}
          failAlertHandler={showFailedToCreateRecipeAlert}
        />
      </View>

    </SafeAreaProvider>
  );
};

export default CreateRecipe;
