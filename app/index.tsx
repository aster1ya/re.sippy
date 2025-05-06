import { Tabs, Link, router } from "expo-router";
import { Text, View, StyleSheet, TextInput, SafeAreaView, StatusBar, Platform, TouchableOpacity, Image, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

const images = [
  require('../assets/images/Pasta1.jpg'),
  require('../assets/images/Pasta2.jpg'),
  require('../assets/images/Pasta3.jpg'),
];


const Index = () => {
  const apiUrl = "http://localhost:5000/api/recipes";

  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIndex(prev => (prev + 1) % images.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.containerBg} />

      <View style={[styles.topSection, { backgroundColor: "#417023" }]}>
        <Text style={[styles.appName, { color: theme.textColor }]}>re.sippy</Text>
        <Text style={[styles.tagline, { color: theme.subTextColor }]}>Stirring up delicious moments.</Text>

        <View style={styles.topRowInline}>
          <View style={[styles.searchBarContainer, { backgroundColor: theme.inputBg }]}>
            <Ionicons name="search" size={20} color={theme.placeholderColor} style={styles.searchIconInline} />
            <TextInput
  style={[styles.searchBar, { color: theme.textColor }]}
  placeholder="Search recipes..."
  placeholderTextColor={theme.placeholderColor}
  value={searchText}
  onChangeText={setSearchText}
  onSubmitEditing={() => {
    if (searchText.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchText.trim())}`);
    }
  }}
/>
          </View>
          <TouchableOpacity onPress={() => setIsDarkMode(prev => !prev)}>
            <Ionicons name="moon" size={28} color={theme.iconColor} style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => location.href = '/login'}>
            <Ionicons name="person-circle-outline" size={32} color={theme.iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.container, { backgroundColor: theme.containerBg }]}>
        <Text style={[styles.sectionHeader, { color: theme.textColor }]}>Today's Recommendation</Text>
        <Animated.Image source={images[index]} style={[styles.recipeImage, { opacity: fadeAnim }]} />
        <Text style={[styles.recipeTitle, { color: theme.textColor }]}>Creamy Garlic Shrimp Pasta</Text>
        <Text style={[styles.recipeInfo, { color: theme.subTextColor }]}>⏱ 25 mins   🌟 Easy   🍤 Shrimp, cream, fettuccine</Text>
      </View>

      <View style={[styles.tabContainer, { backgroundColor: theme.tabBg }]}>
        <Link href="/" style={styles.tabButton}>
          <Ionicons name="home" size={24} color={theme.iconColor} />
          <Text style={[styles.tabLabel, { color: theme.textColor }]}>Home</Text>
        </Link>
        <Link href="/register" style={styles.tabButton}>
          <Ionicons name="restaurant" size={24} color={theme.iconColor} />
          <Text style={[styles.tabLabel, { color: theme.textColor }]}>Recipes</Text>
        </Link>
        <Link href="/settings" style={styles.tabButton}>
          <Ionicons name="settings" size={24} color={theme.iconColor} />
          <Text style={[styles.tabLabel, { color: theme.textColor }]}>Settings</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeImage: {
    width: 380,
    height: 270,
    borderRadius: 20,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeInfo: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 10,
    textAlign: 'center',
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