import React, { useState, useEffect } from "react";
import {
  Button,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import { GetRecipeById } from "../../controller";
import IRecipe from "../../types/Recipe";
import styles from '../../styles';

const Details = () => {
  const apiUrl = "http://localhost:5000/api/recipe";
  const router = useRouter();
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

  const 

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.baseContainer}>
          <View>
            {/* <Text>Recipe has ID: {id}</Text> */}
            <Text style={styles.baseTitle}>{recipe?.title}</Text>
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

        <Button
          color='tomato'
          title='Edit Recipe'
          onPress=
        />
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Details;