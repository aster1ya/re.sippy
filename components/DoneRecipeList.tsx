import { Text, StyleSheet, View, Button, Alert } from "react-native";
import React from "react";
import IRecipe from "../types/Recipe";
import { useRouter } from "expo-router";
import { RemoveFromDoneList } from "../controller";

type DoneRecipeListProps = {
  recipes: IRecipe[];
  uid: string;
  onRecipeRemoved: () => void;
};

const DoneRecipeList = ({ recipes, uid, onRecipeRemoved }: DoneRecipeListProps) => {
  const router = useRouter();

  const goToRecipe = (recipeId: string) => {
    router.push({
      pathname: "/recipe_details/[id]",
      params: { id: recipeId },
    });
  };

  const handleRemoveFromDone = async (recipeId: string) => {
    try {
      const result = await RemoveFromDoneList(recipeId, uid);
      
      if (result.success) {
        Alert.alert("Removed", "Recipe has been removed from your Done List.");
        onRecipeRemoved(); // Refresh the list
      } else {
        Alert.alert("Error", result.message || "Could not remove recipe from Done List.");
      }
    } catch (error) {
      console.error("Remove from done failed:", error);
      Alert.alert("Error", "Could not remove recipe from Done List.");
    }
  };

  return (
    <View style={styles.container}>
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <View key={index} style={styles.recipePreview}>
            <View style={styles.row}>
              <Text style={styles.header}>{recipe.title}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="View"
                  onPress={() => goToRecipe(recipe._id || "")}
                />
                <View style={styles.buttonSpacer} />
                <Button
                  title="Remove"
                  color="#FF9500"
                  onPress={() => handleRemoveFromDone(recipe._id || "")}
                />
              </View>
            </View>
            <Text>{recipe.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noRecipes}>No recipes marked as done yet</Text>
      )}
    </View>
  );
};

export default DoneRecipeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  recipePreview: {
    marginBottom: 30,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
  },
  header: {
    fontSize: 26,
  },
  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonSpacer: {
    width: 10,
  },
  noRecipes: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#666",
  }
});