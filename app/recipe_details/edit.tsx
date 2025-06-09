import React from "react";
import { 
  Alert,  
  View 
} from "react-native";
import RecipeInput from "@/components/RecipeInput";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLocalSearchParams, useRouter } from "expo-router";

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
