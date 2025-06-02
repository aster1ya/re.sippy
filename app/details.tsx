import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import styles from "../styles";

const RecipeDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  interface Meal {
    strMealThumb: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    [key: string]: string | null;
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

  const handleDelete = async () => {
    Alert.alert("Delete Recipe", "Are you sure you want to delete this recipe?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://localhost:5000/api/recipes/${id}`);
            Alert.alert("Deleted!", "Recipe successfully deleted.");
            router.back();
          } catch (error) {
            console.error("Delete failed:", error);
            Alert.alert("Error", "Could not delete recipe.");
          }
        },
      },
    ]);
  };

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