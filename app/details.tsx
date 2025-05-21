import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import axios from "axios";
import styles from "@/styles";

const RecipeDetail = () => {
  const { id } = useLocalSearchParams();
  interface Meal {
    strMealThumb: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    [key: string]: string | null; // To handle dynamic ingredient and measure keys
  }
  
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setMeal(res.data.meals?.[0]);
      } catch (error) {
        console.error("Error loading meal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#417023" style={{ marginTop: 40 }} />;

  if (!meal) return <Text style={{ color: "#fff", margin: 20 }}>Recipe not found.</Text>;

  return (
    <SafeAreaView style={styles.detailSafeArea}>
      <ScrollView style={styles.detailContainer}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.recipeImage} />
        <Text style={styles.detailTitle}>{meal.strMeal}</Text>
        <Text style={styles.detailCategory}>{meal.strCategory} • {meal.strArea}</Text>

        <Text style={styles.detailSection}>Instructions</Text>
        <Text style={styles.recipeInstructions}>{meal.strInstructions}</Text>

        <Text style={styles.detailSection}>Ingredients</Text>
        {Array.from({ length: 20 }, (_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];
          if (ingredient) {
            return (
              <Text key={i} style={styles.recipeIngredients}>
                - {ingredient} {measure}
              </Text>
            );
          }
          return null;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetail;
