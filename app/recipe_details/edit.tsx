import React, { useState, useEffect } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CreateRecipeRequest, GetRecipeById } from "../../controller";
import axios from "axios";
import IRecipe from "@/types/Recipe";
import styles from "../../styles";
import RecipeInput from "@/components/RecipeInput";

const EditRecipe = () => {
  //establish connection to API to pull recipe data
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const showUpdatedRecipeAlert = (newRecipeId: string) => {
    Alert.alert("Success", "Recipe has been successfully updated.", [
      {
        text: "OK",
      },
    ]);
  };

  const showFailedToUpdateAlert = (message: string) => {
    Alert.alert("Failed to update recipe", "Recipe not update. " + message);
  };

  return (
    <SafeAreaProvider>
      <View>
        <RecipeInput
          isEditing={true}
          existingRecipeId={Array.isArray(id) ? id[0] : id}
          failAlertHandler={showFailedToUpdateAlert}
          successAlertHandler={showUpdatedRecipeAlert}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default EditRecipe;
