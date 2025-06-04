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
import RecipeList from "@/components/RecipeList";
import CustomSearchBar from "@/components/CustomSearchBar";
import IRecipe from "@/types/Recipe";
import { SearchRecipes } from "@/controller";

const SearchScreen = () => {
  const { q } = useLocalSearchParams();
  const router = useRouter();

  const [dbResults, setDbResults] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>();

  const fetchResults = async () => {
    try {
      setLoading(true);
      const dbRecipes = await SearchRecipes({ title: searchText });
      setDbResults(dbRecipes || []);
      console.log();
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText) {
      fetchResults();
    }
  }, [searchText]);

  useEffect(() => {
    setSearchText(Array.isArray(q) ? q[0] : q);
  }, [q]);

  return (
    <SafeAreaView style={styles.searchSafeArea}>
      <CustomSearchBar
        searchHandler={(searchInput) => {
          setSearchText(searchInput);
        }}
      />
      <View style={styles.searchContainer}>
        <Text style={styles.searchTitle}>Search Results for "{q}"</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#417023" />
        ) : dbResults.length === 0 ? (
          <Text style={styles.searchNoResult}>No results found.</Text>
        ) : (
          <RecipeList recipes={dbResults} />

          /* ### old search list ###
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
          */
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
