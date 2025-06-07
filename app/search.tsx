import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { 
  SearchRecipes,
} from "@/controller";
import CustomSearchBar from "@/components/CustomSearchBar";

import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

import IRecipe from "@/types/Recipe";
import RecipeList from "@/components/RecipeList";
import styles from "../styles";

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
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
