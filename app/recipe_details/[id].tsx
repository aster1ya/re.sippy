import React, { useState, useEffect } from "react";
import { 
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import styles from '../../styles';
import IRecipe from "../../types/Recipe";
import { GetRecipeById } from "../../controller";

const Details = () => {
  const apiUrl = "http://localhost:5000/api/recipe";
  const { id } = useLocalSearchParams();

  const [recipe, setRecipe] = useState<IRecipe>();

  const fetchRecipe = async () => {
    const idStr = Array.isArray(id) ? id[0] : id; //handle if multiple IDs are given, take the first one
    const recipe = await GetRecipeById(idStr);
    if (recipe) {
      setRecipe(recipe);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.baseContainer}>
          <View>
            <Text style={styles.baseTitle}>{recipe?.title}</Text>
            {/* <Text>Recipe has ID: {id}</Text> */}
          </View>

          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Author</Text>
                <Text>{recipe?.authorId}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text>{recipe?.mealType}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Prep Time</Text>
                <Text>{recipe?.prepTime}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Cook Time</Text>
                <Text>{recipe?.cookTime}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Total Time</Text>
                <Text>{recipe?.totalTime}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Servings</Text>
                <Text>{recipe?.servings}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Description</Text>
            <Text>{recipe?.description}</Text>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Ingredients</Text>
            <Text>{recipe?.ingredients}</Text>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Instructions</Text>
            <Text>{recipe?.instructions}</Text>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Notes</Text>
            <Text>{recipe?.notes}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Details;