import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
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

// Added: tag filter
const TAGS = ["Vegan", "Vegetarian", "Halal", "Gluten Free"];

const SearchScreen = () => {
  const { q } = useLocalSearchParams();
  const router = useRouter();

  const [dbResults, setDbResults] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>();
  // Added: selectedTags state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Added: handleTagToggle function
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

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
    //if (searchText) {
    fetchResults();
    //}
  }, [searchText]);

  useEffect(() => {
    setSearchText(Array.isArray(q) ? q[0] : q);
  }, [q]);

  // Added: filteredRecipes (apply tag filter)
  const filteredRecipes =
    selectedTags.length === 0
      ? dbResults
      : dbResults.filter((recipe) =>
          selectedTags.every((tag) => recipe.tags?.includes(tag))
        );

  return (
    <SafeAreaView style={styles.searchSafeArea}>
      <ScrollView>
        <CustomSearchBar
          searchHandler={(searchInput) => {
            setSearchText(searchInput);
          }}
        />
        {/* Added: Tag filter buttons */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginVertical: 10,
            alignSelf: "center",
          }}
        >
          {TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={{
                backgroundColor: selectedTags.includes(tag)
                  ? "tomato"
                  : "#F0F0F0",
                borderRadius: 20,
                paddingVertical: 6,
                paddingHorizontal: 14,
                margin: 4,

                borderWidth: 1,
                borderColor: selectedTags.includes(tag) ? "tomato" : "#808080",
              }}
              onPress={() => handleTagToggle(tag)}
            >
              <Text
                style={{ color: selectedTags.includes(tag) ? "#fff" : "#333" }}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* End of tag filter buttons */}

        <View style={styles.bookContainer}>
          {searchText === "" ? (
            <Text style={styles.bookTitle}>Showing all recipes </Text>
          ) : (
            <Text style={styles.bookTitle}>Results for "{searchText}"</Text>
          )}

          {loading ? (
            <ActivityIndicator size="large" color="#417023" />
          ) : filteredRecipes.length === -1 ? (
            <Text style={styles.searchNoResult}>No results found.</Text>
          ) : (
            <RecipeList recipes={filteredRecipes}/>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
