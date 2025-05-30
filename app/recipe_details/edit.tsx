import React, { useState, useEffect } from "react";
import {
    Alert,
    Button,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GetRecipeById } from '../../controller';
import axios from "axios";
import IRecipe from "@/types/Recipe";
import styles from "../../styles";

const EditRecipe = () => {
    //establish connection to API to pull recipe data
    const apiUrl = "http://localhost:5000/api/recipes";
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [recipe, setRecipe] = useState<IRecipe>();

    const [title, setTitle] = useState<String>("");
    const [authorId, setAuthor] = useState<String>("");
    const [mealType, setType] = useState<String>("");
    const [prepTime, setPrep] = useState<String>("");
    const [cookTime, setCook] = useState<String>("");
    const [totalTime, setTotal] = useState<String>("");
    const [servings, setServe] = useState<String>("");
    const [description, setDescription] = useState<String>("");
    const [ingredients, setIngredients] = useState<String>("");
    const [instructions, setInstructions] = useState<String>("");
    const [notes, setNotes] = useState<String>("");

    const fetchRecipe = async () => {
        const idStr = Array.isArray(id) ? id[0] : id; //handle if multiple IDs are given, take the first one
        const recipe = await GetRecipeById(idStr);
        if (recipe) {
          setRecipe(recipe);
        }
    };
    useEffect(() => {
        fetchRecipe();
    }, []);

    const showUpdatedRecipeAlert = () => {
        Alert.alert("success", "Recipe has been successfully updated.");
    }

    const showFailedToUpdateAlert = () => {
        Alert.alert("failed", "Recipe has not been updated. Please try again.");
    }

    const UploadRecipe = async () => {
        const newRecipe : IRecipe = {
          title: title,
          authorId: authorId,
          mealType: mealType,
          prepTime: prepTime,
          cookTime: cookTime,
          totalTime: totalTime,
          servings: servings,
          description: description,
          ingredients: ingredients,
          instructions: instructions,
          notes: notes,
          tags: [""],
        }
        //
    }

    //for a (potential) function to dynamically add TextInput components
    //const [inputRow, setInputRow] = useState([]);

    //render the layout of the recipe editor
    return (
        <SafeAreaProvider>
            <ScrollView>
                <View style={styles.baseContainer}>
                    <View>
                        <TextInput
                            autoCapitalize="words"
                            defaultValue = {recipe?.title.toString() || "N/A"}
                            inputMode="text"
                            onChangeText={(newText) => setTitle(newText)}
                            style={styles.createTitle}
                        />
                    </View>

                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Information</Text>
                        <View style={styles.infoGrid}>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Author</Text>
                                <TextInput
                                    defaultValue={recipe?.authorId.toString() || "N/A"}
                                    inputMode="text"
                                    onChangeText={(newText) => setAuthor(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Type</Text>
                                <TextInput
                                    defaultValue={recipe?.mealType.toString() || "N/A"}
                                    inputMode="text"
                                    onChangeText={(newText) => setType(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Prep Time</Text>
                                <TextInput
                                    defaultValue={recipe?.prepTime.toString() || "N/A"}
                                    inputMode="text"
                                    onChangeText={(newText) => setPrep(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Cook Time</Text>
                                <TextInput
                                    defaultValue={recipe?.cookTime.toString() || "N/A"}
                                    inputMode="text"
                                    onChangeText={(newText) => setCook(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Total Time</Text>
                                <TextInput
                                    defaultValue={recipe?.totalTime.toString() || "N/A"}
                                    inputMode="text"
                                    onChangeText={(newText) => setTotal(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Servings</Text>
                                <TextInput
                                    defaultValue={recipe?.servings.toString() || "0"}
                                    inputMode="numeric"
                                    onChangeText={(newText) => setServe(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.baseContainer}>
                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Description</Text>
                        <TextInput
                            defaultValue={recipe?.description?.toString() || "N/A"}
                            onChangeText={(newText) => setDescription(newText)}
                        />
                        {/* 
                        <Button
                            color="tomato"
                            title="Add New Description"
                        />
                        */}
                    </View>
                </View>

                <View style={styles.baseContainer}>
                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Ingredients</Text>
                        <TextInput
                            defaultValue={recipe?.ingredients?.toString() || "N/A"}
                            onChangeText={(newText) => setIngredients(newText)}
                        />
                        {/*
                        <Button
                            color="tomato"
                            title="Add New Ingredient"
                        />
                        */}
                    </View>
                </View>

                <View style={styles.baseContainer}>
                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Instructions</Text>
                        <TextInput
                            defaultValue={recipe?.instructions?.toString() || "N/A"}
                            onChangeText={(newText) => setInstructions(newText)}
                        />
                        {/*
                        <Button
                            color="tomato"
                            title="Add New Step"
                        />
                        */}
                    </View>
                </View>

                <View style={styles.baseContainer}>
                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Notes</Text>
                        <Text style={styles.h1}>Instructions</Text>
                        <TextInput
                            defaultValue={recipe?.notes?.toString() || "N/A"}
                            onChangeText={(newText) => setNotes(newText)}
                        />
                        {/*
                        <Button
                            color="tomato"
                            title="Add New Note"
                        />
                        */}
                    </View>
                </View>

                <Button
                    color="tomato"
                    title="Save Recipe"
                    //onPress=
                />
            </ScrollView>
        </SafeAreaProvider>
    )
};

export default EditRecipe;