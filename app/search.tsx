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
  TextInput,
} from "react-native";
import axios from "axios";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";

// Example theme object, adjust as needed or import from your theme file
const theme = {
  placeholderColor: "#ccc",
  textColor: "#fff",
};

interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface DBRecipe {
  _id: string;
  title: string;
  image: string;
}

const SearchScreen = () => {
  const { q } = useLocalSearchParams();
  const router = useRouter();

  const [mealDbResults, setMealDbResults] = useState<MealDBRecipe[]>([]);
  const [dbResults, setDbResults] = useState<DBRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchResults = async () => {
    try {
      setLoading(true);

      const mealRes = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`
      );
      setMealDbResults(mealRes.data.meals || []);

      const dbRes = await axios.get(`http://localhost:5000/api/search?q=${q}`);
      setDbResults(dbRes.data || []);
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
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
        <Ionicons
          name="search"
          size={20}
          color={theme.placeholderColor}
          style={styles.indexSearchIconInline}
        />
        <TextInput
          style={[styles.indexSearchBar, { color: theme.textColor }]}
          placeholder="Search recipes..."
          placeholderTextColor={theme.placeholderColor}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => {
            if (searchText.trim()) {
              router.replace(
                `/search?q=${encodeURIComponent(searchText.trim())}`
              );
            }
          }}
        />
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchTitle}>Search Results for "{q}"</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#417023" />
        ) : mealDbResults.length === 0 && dbResults.length === 0 ? (
          <Text style={styles.searchNoResult}>No results found.</Text>
        ) : (
          <FlatList
            data={[...dbResults, ...mealDbResults]}
            keyExtractor={(item: any) => item._id || item.idMeal}
            renderItem={({ item }: { item: DBRecipe | MealDBRecipe }) => {
              const isDb = "_id" in item;

              return (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: isDb ? "/recipe_details/[id]" : "/details",
                      params: { id: isDb ? item._id : item.idMeal },
                    })
                  }
                  style={styles.searchMealCard}
                >
                  <Image
                    source={{ uri: isDb ? item.image : item.strMealThumb }}
                    style={styles.searchMealImage}
                  />
                  <Text style={styles.searchMealName}>
                    {isDb ? item.title : item.strMeal}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
