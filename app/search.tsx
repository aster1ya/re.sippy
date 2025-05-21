import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import axios from "axios";
import styles from "@/styles";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const SearchScreen = () => {
  const { q } = useLocalSearchParams();
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`
      );
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [q]);

  return (
    <SafeAreaView style={styles.searchSafeArea}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchTitle}>Search Results for "{q}"</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#417023" />
        ) : recipes.length === 0 ? (
          <Text style={styles.searchNoResult}>No results found.</Text>
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/details",
                      params: { id: item.idMeal },
                    })
                  }
                  style={styles.searchMealCard}
                >
                  <Image source={{ uri: item.strMealThumb }} style={styles.searchMealImage} />
                  <Text style={styles.searchMealName}>{item.strMeal}</Text>
                </TouchableOpacity>
              )}
              
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
