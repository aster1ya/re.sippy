import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  CheckIfFavorited,
  GetCurrentUID,
  GetRecipeById,
  MarkRecipeAsDone,
} from "../../controller";
import FavoriteStar from "@/components/FavoriteStar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

import axios from "axios";
import { auth } from "@/backend/firebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";

import IRecipe from "@/types/Recipe";
import styles from "../../styles";

const Details = () => {
  const isFocused = useIsFocused();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const recipeId = Array.isArray(id) ? id[0] : id; //handle if multiple IDs are given, take the first one

  const [recipe, setRecipe] = useState<IRecipe>();
  const [favorited, setFavorited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const uid = GetCurrentUID();

  const fetchRecipe = async () => {
    console.log("id test");
    console.log("id: " + id);

    const idStr = Array.isArray(id) ? id[0] : id;
    const recipe = await GetRecipeById(idStr);

    if (recipe) {
      setRecipe(recipe);
    }
  };

  const fetchFavorited = async () => {
    const { favorited } = await CheckIfFavorited(uid, recipeId);
    setFavorited(favorited);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchRecipe();

      if (auth.currentUser) {
        fetchFavorited();
      } else {
        setLoading(false);
      }
    }
  }, [isFocused]);

  const goToRecipe = (recipeId: string) => {
    router.push({
      pathname: "/recipe_details/edit",
      params: { id: recipeId },
    });
  };

  const handleDelete = async () => {
    const idStr = Array.isArray(id) ? id[0] : id;
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`http://localhost:5000/api/recipes/${idStr}`);
              Alert.alert("Deleted!", "Recipe successfully deleted.");
              router.back();
            } catch (error) {
              console.error("Delete failed:", error);
              Alert.alert("Error", "Could not delete recipe.");
            }
          },
        },
      ]
    );
  };

  // ✅ Mark as Done Handler (추가된 부분)
  const handleMarkAsDone = async () => {
    try {
      const idStr = Array.isArray(id) ? id[0] : id;
      const result = await MarkRecipeAsDone(idStr, uid);
      
      if (result.success) {
        Alert.alert("Done!", "Recipe has been added to your Done List.");
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Mark as Done failed:", error);
      Alert.alert("Error", "Could not mark as done.");
    }
  };

  if (loading)
    return (
      <ActivityIndicator
        color="#417023"
        size="large"
        style={{ marginTop: 40 }}
      />
    );

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.favButton}>
          {auth.currentUser ? (
            <FavoriteStar
              recipeId={recipeId}
              uid={uid}
              isFavorited={favorited}
            ></FavoriteStar>
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.baseContainer}>
          <View>
            <Text style={styles.baseTitle}>{recipe?.title}</Text>
          </View>

          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Author</Text>
                <Text 
                  style={{ color: 'blue', textDecorationLine: 'underline' }}
                  onPress={() => router.push({
                    pathname: "/author/[id]",
                    params: { 
                      id: recipe?.authorId,
                      name: recipe?.author 
                    },
                  })}
                >
                  {recipe?.author}
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text>{recipe?.mealType}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Prep Time</Text>
                <Text>{recipe?.prepTime}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Cook Time</Text>
                <Text>{recipe?.cookTime}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Total Time</Text>
                <Text>{recipe?.totalTime}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Servings</Text>
                <Text>{recipe?.servings}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Description</Text>
            <Text>{recipe?.description}</Text>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Ingredients</Text>
            <Text>{recipe?.ingredients}</Text>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Instructions</Text>
            <Text>{recipe?.instructions}</Text>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Notes</Text>
            <Text>{recipe?.notes}</Text>
          </View>
        </View>

        <View style={styles.baseContainer}>
          <View style={styles.baseSubContainer}>
            <Text style={styles.h1}>Tags</Text>
            {recipe?.tags.length ? (
              <View>
                {recipe?.tags.map(item => (
                  <Text>{item.toString()}</Text>
                ))}
              </View>
            ) : (
              <Text>No Tags Available</Text>
            )}
          </View>
        </View>

        {/* ✅ Mark as Done 버튼 - Edit Recipe 위에 추가 */}
        {auth.currentUser && (
          <View style={styles.longButton}>
            <Button
              title="Mark as Done"
              color="#62C370"
              onPress={handleMarkAsDone}
            />
          </View>
        )}
        
        {/*Show the Edit Recipe and Delete button ONLY if the authorId matches the logged-in user's uId.*/}
        {auth.currentUser?.uid === recipe?.authorId ? (
          <View style={styles.longButton}>
            <Button
              title="Edit Recipe"
              color="tomato"
              onPress={() => goToRecipe(Array.isArray(id) ? id[0] : id)}
            />
          </View>
        ) : (
          <View></View>
        )}

        {auth.currentUser?.uid === recipe?.authorId ? (
          <View style={styles.longButton}>
            <Button 
              title="Delete"
              color="red"
              onPress={handleDelete}/>
          </View>
        ) : (
          <View></View>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Details;
