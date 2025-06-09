import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { GetCurrentUID, GetMongoUserByUID, SearchRecipes } from "../controller";
import { auth } from "@/backend/firebaseConfig";
import RecipeList from "../components/RecipeList";
import styles from "../styles";
import { useIsFocused } from "@react-navigation/native";
import IRecipe from "@/types/Recipe";

const Profile = () => {
  const isFocused = useIsFocused();
  const [userRecipes, setUserRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const uid = GetCurrentUID();

  const fetchUserData = async () => {
    if (uid) {
      const user = await GetMongoUserByUID(uid);
      if (user) {
        setUserData(user);
      }
    }
  };

  const fetchUserRecipes = async () => {
    if (uid) {
      const recipes = await SearchRecipes({ authorId: uid });
      if (recipes) {
        setUserRecipes(recipes);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused && auth.currentUser) {
      fetchUserData();
      fetchUserRecipes();
    } else {
      setLoading(false);
    }
  }, [isFocused]);

  if (!auth.currentUser) {
    return (
      <View style={styles.baseContainer}>
        <Text>Please log in to view your profile.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#417023"
        style={{ marginTop: 40 }}
      />
    );
  }

  return (
    <ScrollView>
      <View style={styles.baseContainer}>
        <Text style={styles.baseTitle}>My Profile</Text>
        <View style={localStyles.userInfo}>
          <Text style={styles.h1}>Email: {auth.currentUser?.email}</Text>
          <Text style={styles.h1}>Recipes Created: {userRecipes.length}</Text>
        </View>
      </View>
      
      <View style={styles.baseContainer}>
        <Text style={styles.h1}>My Recipes</Text>
      </View>
      <RecipeList recipes={userRecipes} />
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  userInfo: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  }
});

export default Profile;