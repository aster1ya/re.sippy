import { Tabs, Link, router } from "expo-router";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

import { SearchRecipes, GetRecipeById } from "../controller";
import IRecipe from "../types/Recipe";

interface Recommendation {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

const images = [
  require("../assets/images/Pasta1.jpg"),
  require("../assets/images/Pasta2.jpg"),
  require("../assets/images/Pasta3.jpg"),
];

import { auth } from "../backend/firebaseConfig";
import { User } from "firebase/auth";

const Index = () => {
  const apiUrl = "http://localhost:5000/api/recipes";

  const [recipes, setRecipes] = useState([]);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchText, setSearchText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(apiUrl);
      setRecipes(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchRecommendation(); // ← Add this
  }, []);
  const fetchRecommendation = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const meals = res.data?.meals;
      if (meals && meals.length > 0) {
        setRecommendation(meals[0]);
      } else {
        console.warn("No meals returned from API");
      }
    } catch (err) {
      console.error("Failed to fetch recommendation:", err);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % images.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  //need to have this auth observer with a useState on every page that needs to have auth updated without the page being recreated e.g. you dont need it on the profile page because updating auth (logging out) would involve going back to index and unloading the page, but you do need it on Index because it always exists at the bottom of the stack.
  //for pages without the observer, just use the import. const user = auth.currentUser
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log("sign out error: ", error.message);
      });
  };

  //TESTING FUNCTION FOR SearchRecipes() IN controller.tsx
  //ALSO UNCOMMENT THE TEST BUTTON TO TEST THIS FUNCTION
  //
  // const testFunction = async () => {
  //   const recipes: IRecipe[] = await SearchRecipes({
  //     title: "izz",
  //     tags: ["both"],
  //   });
  //   console.log("RECIPE OUTPUT:");
  //   console.log(recipes);
  //   // for (let i = 0; i < recipes.; i++) {
  //   //   console.log(recipes[i].title);
  //   // }
  // };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView
      style={[styles.indexSafeArea, { backgroundColor: theme.backgroundColor }]}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.containerBg}
      />

      <View style={[styles.indexTopSection, { backgroundColor: "#417023" }]}>
        <Text style={[styles.indexAppName, { color: theme.textColor }]}>
          re.sippy
        </Text>
        <Text style={[styles.indexTagline, { color: theme.subTextColor }]}>
          {currentUser ? "Logged in as " + currentUser?.email : "Not Logged In"}
        </Text>

        <View style={styles.indexTopRowInline}>
          <View
            style={[
              styles.indexSearchBarContainer,
              { backgroundColor: theme.inputBg },
            ]}
          >
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
                  router.push(
                    `/search?q=${encodeURIComponent(searchText.trim())}`
                  );
                }
              }}
            />
          </View>
          <TouchableOpacity onPress={() => setIsDarkMode((prev) => !prev)}>
            <Ionicons
              name="moon"
              size={28}
              color={theme.iconColor}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
          {currentUser ? (
            <Button title={"Sign\nout"} onPress={handleSignOut} />
          ) : (
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Ionicons
                name="person-circle-outline"
                size={32}
                color={theme.iconColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View
        style={[styles.indexContainer, { backgroundColor: theme.containerBg }]}
      >
        <Text style={[styles.indexSectionHeader, { color: theme.textColor }]}>
          Today's Recommendation
        </Text>
        {recommendation ? (
          <>
            <Image
              source={{ uri: recommendation.strMealThumb }}
              style={styles.recipeImage}
            />
            <Text style={[styles.indexRecipeTitle, { color: theme.textColor }]}>
              {recommendation.strMeal}
            </Text>
            <Text
              style={[styles.indexRecipeInfo, { color: theme.subTextColor }]}
            >
              🍽 {recommendation.strCategory} • 🌍 {recommendation.strArea}
            </Text>
          </>
        ) : (
          <Text style={{ color: theme.subTextColor }}>Loading...</Text>
        )}
      </View>

      {/* TEST BUTTON FOR SearchRecipes() */}
      {/* <Button title="test" onPress={testFunction} /> */}

      <View
        style={[styles.indexTabContainer, { backgroundColor: theme.tabBg }]}
      >
        <Link href="/book" style={styles.indexTabButton}>
          <Ionicons name="book" size={24} color={theme.iconColor} />
          <Text style={[styles.indexTabLabel, { color: theme.textColor }]}>
            Recipe Book
          </Text>
        </Link>
        <Link href="/create" style={styles.indexTabButton}>
          <Ionicons name="restaurant" size={24} color={theme.iconColor} />
          <Text style={[styles.indexTabLabel, { color: theme.textColor }]}>
            Create Recipe
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const lightTheme = {
  backgroundColor: "#f5f5f5",
  containerBg: "#ffffff",
  textColor: "#000000",
  subTextColor: "#444",
  inputBg: "#e0e0e0",
  placeholderColor: "#666",
  tabBg: "#ddd",
  iconColor: "#222",
};

const darkTheme = {
  backgroundColor: "#2c2c2c",
  containerBg: "#2c2c2c",
  textColor: "#ffffff",
  subTextColor: "#ccc",
  inputBg: "#444",
  placeholderColor: "#ccc",
  tabBg: "#1f1f1f",
  iconColor: "#fff",
};

export default Index;
