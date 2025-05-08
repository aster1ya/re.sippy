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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.category}>{meal.strCategory} • {meal.strArea}</Text>

        <Text style={styles.section}>Instructions</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>

        <Text style={styles.section}>Ingredients</Text>
        {Array.from({ length: 20 }, (_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];
          if (ingredient) {
            return (
              <Text key={i} style={styles.ingredient}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    color: "#fff",
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "600",
  },
  instructions: {
    fontSize: 14,
    color: "#ddd",
    lineHeight: 22,
  },
  ingredient: {
    fontSize: 14,
    color: "#eee",
    marginBottom: 2,
  },
});

export default RecipeDetail;
