import React, { useState, useEffect } from 'react';
import {
    Alert,
    Button,
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from "expo-router";
import { useRouter } from 'expo-router';
import { GetRecipeById } from '../../controller';
import CreateRecipe from '../../app/create';
import IRecipe from '../../types/Recipe';
import styles from '../../styles';

const EditRecipe = () => {
    //establish connection to API to pull recipe data
    const apiUrl = 'http://localhost:5000/api/recipes';
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [recipe, setRecipe] = useState<IRecipe>();

    const [title, setTitle] = useState<string>("");
    const [authorId, setAuthor] = useState<string>("");
    const [mealType, setType] = useState<string>("");
    const [prepTime, setPrep] = useState<string>("");
    const [cookTime, setCook] = useState<string>("");
    const [totalTime, setTotal] = useState<string>("");
    const [servings, setServe] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [ingredients, setIngredients] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

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

    //for a (potential) function to dynamically add TextInput components
    const [inputRow, setInputRow] = useState([]);

    //render the layout of the recipe editor
    return (
        <SafeAreaProvider>
            <ScrollView>
                <View style={styles.baseContainer}>
                    <View>
                        <TextInput
                            autoCapitalize='words'
                            defaultValue={recipe?.title.toString()}
                            inputMode='text'
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
                                    defaultValue={recipe?.authorId.toString()}
                                    inputMode='text'
                                    onChangeText={(newText) => setAuthor(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Type</Text>
                                <TextInput
                                    defaultValue={recipe?.mealType.toString()}
                                    inputMode='text'
                                    onChangeText={(newText) => setType(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Prep Time</Text>
                                <TextInput
                                    defaultValue={recipe?.prepTime.toString()}
                                    inputMode='text'
                                    onChangeText={(newText) => setPrep(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Cook Time</Text>
                                <TextInput
                                    defaultValue={recipe?.cookTime.toString()}
                                    inputMode='text'
                                    onChangeText={(newText) => setCook(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Total Time</Text>
                                <TextInput
                                    defaultValue={recipe?.totalTime.toString()}
                                    inputMode='text'
                                    onChangeText={(newText) => setTotal(newText)}
                                    style={styles.infoField}
                                />
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Servings</Text>
                                <TextInput
                                    defaultValue={recipe?.servings.toString()}
                                    inputMode='numeric'
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
                            defaultValue={recipe?.description?.toString()}
                            onChangeText={(newText) => setDescription(newText)}
                        />
                        <Button
                            color='tomato'
                            title='Add New Description'
                        />
                    </View>
                </View>

                <View style={styles.baseContainer}>
                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Ingredients</Text>
                        <TextInput
                            defaultValue={recipe?.ingredients?.toString()}
                            onChangeText={(newText) => setIngredients(newText)}
                        />
                        <Button
                            color='tomato'
                            title='Add New Ingredient'
                        />
                    </View>
                </View>

                <View style={styles.baseContainer}>
                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Instructions</Text>
                        <TextInput
                            defaultValue={recipe?.instructions?.toString()}
                            onChangeText={(newText) => setInstructions(newText)}
                        />
                        <Button
                            color='tomato'
                            title='Add New Step'
                        />
                    </View>
                </View>

                <View style={styles.baseContainer}>
                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Notes</Text>
                        <Text style={styles.h1}>Instructions</Text>
                        <TextInput
                            defaultValue={recipe?.notes?.toString()}
                            onChangeText={(newText) => setNotes(newText)}
                        />
                        <Button
                            color='tomato'
                            title='Add New Note'
                        />
                    </View>
                </View>

                <Button
                    color='tomato'
                    title='Save Recipe'
                />
            </ScrollView>
        </SafeAreaProvider>
    )
};

export default EditRecipe;