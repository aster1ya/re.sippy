import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { GetDoneRecipes, GetCurrentUID } from "../controller";
import IRecipe from "../types/Recipe";
import DoneRecipeList from "../components/DoneRecipeList";
import styles from "../styles";
import { auth } from "@/backend/firebaseConfig";
import { useIsFocused } from "@react-navigation/native";

const DoneList = () => {
  const isFocused = useIsFocused();
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const uid = GetCurrentUID();

  const fetchDoneRecipes = async () => {
    if (uid) {
      const doneRecipes = await GetDoneRecipes(uid);
      if (doneRecipes) {
        setRecipes(doneRecipes);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused && auth.currentUser) {
      fetchDoneRecipes();
    }
  }, [isFocused]);

  if (!auth.currentUser) {
    return (
      <View style={styles.baseContainer}>
        <Text>Please log in to view your Done List.</Text>
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
        <Text style={styles.baseTitle}>Done List</Text>
      </View>
      <DoneRecipeList 
        recipes={recipes} 
        uid={uid} 
        onRecipeRemoved={fetchDoneRecipes} 
      />
    </ScrollView>
  );
};

export default DoneList;