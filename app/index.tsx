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
      console.log("auth updated: ", user);
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

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.containerBg}
      />

      <View style={[styles.topSection, { backgroundColor: "#417023" }]}>
        <Text style={[styles.appName, { color: theme.textColor }]}>
          re.sippy
        </Text>
        <Text style={[styles.tagline, { color: theme.subTextColor }]}>
          {currentUser ? "Logged in as " + currentUser?.email : "Not Logged In"}
        </Text>

        <View style={styles.topRowInline}>
          <View
            style={[
              styles.searchBarContainer,
              { backgroundColor: theme.inputBg },
            ]}
          >
            <Ionicons
              name="search"
              size={20}
              color={theme.placeholderColor}
              style={styles.searchIconInline}
            />
            <TextInput
              style={[styles.searchBar, { color: theme.textColor }]}
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

      <View style={[styles.container, { backgroundColor: theme.containerBg }]}>
        <Text style={[styles.sectionHeader, { color: theme.textColor }]}>
          Today's Recommendation
        </Text>
        {recommendation ? (
          <>
            <Image
              source={{ uri: recommendation.strMealThumb }}
              style={styles.recipeImage}
            />
            <Text style={[styles.recipeTitle, { color: theme.textColor }]}>
              {recommendation.strMeal}
            </Text>
            <Text style={[styles.recipeInfo, { color: theme.subTextColor }]}>
              🍽 {recommendation.strCategory} • 🌍 {recommendation.strArea}
            </Text>
          </>
        ) : (
          <Text style={{ color: theme.subTextColor }}>Loading...</Text>
        )}
      </View>

      <View style={[styles.tabContainer, { backgroundColor: theme.tabBg }]}>
        <Link href="/book" style={styles.tabButton}>
          <Ionicons name="book" size={24} color={theme.iconColor} />
          <Text style={[styles.tabLabel, { color: theme.textColor }]}>
            Recipe Book
          </Text>
        </Link>
        <Link href="/create" style={styles.tabButton}>
          <Ionicons name="restaurant" size={24} color={theme.iconColor} />
          <Text style={[styles.tabLabel, { color: theme.textColor }]}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  topRowInline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  tagline: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 10,
    width: 280,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIconInline: {
    marginRight: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recipeImage: {
    width: 380,
    height: 270,
    borderRadius: 20,
    resizeMode: "cover",
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeInfo: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 10,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  tabButton: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default Index;
