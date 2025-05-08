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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Search Results for "{q}"</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#417023" />
        ) : recipes.length === 0 ? (
          <Text style={styles.noResult}>No results found.</Text>
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
                  style={styles.card}
                >
                  <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                  <Text style={styles.mealName}>{item.strMeal}</Text>
                </TouchableOpacity>
              )}
              
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#1c1c1c",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: 200,
    width: "100%",
  },
  mealName: {
    color: "#fff",
    fontSize: 18,
    padding: 10,
  },
  noResult: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 40,
    textAlign: "center",
  },
});

export default SearchScreen;
