import React, { useState, useEffect } from 'react';
import {
    FlatList,
    SectionList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import axios from 'axios';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from '@/styles';

const RecipeBase = () => {
    //set up and establish connection to API to pull recipe data
    const apiUrl = 'http://localhost:5000/api/recipes';
    const [recipes, getRecipes] = useState([]);
    
    //function to perform API calls
    const fetchRecipe = async () => {
        try {
            const response = await axios.get(apiUrl);
            getRecipes(response.data);
        } catch (e) {
            console.log(e);
        }
    };

     //call the function to get recipes
     useEffect(() => {
        fetchRecipe();
    }, []);

    //function to dynamically handle checkbox entries
    /*
    const [ingredients, setIngredients] = useState([]);
    function displayIngredient() {
        return (
            <BouncyCheckbox style={styles.checklist}
                onPress={(isChecked: boolean) => console.log(isChecked)}
                textComponent={<FlatList />}
                iconStyle={{borderRadius:0}}
                innerIconStyle={{borderRadius:0}}
            />
        )
    }
    */

    //dummy data to insert into the blank recipe
    let newName: string = 'New Recipe';
    const INGREDIENTS = [
        { 
            title:'Section One', 
            data:['Item One', 'Item Two', 'Item Three'] },
        {   title:'Section Two', 
            data:['Item One', 'Item Two', 'Item Three'] }
    ];
    const INSTRUCTIONS = [
        {   id:1, 
            title:'Example' },
        {   id:2, 
            title:'Example' },
        {   id:3, 
            title:'Example' }
    ];

    //render the layout of the recipe
    return (
        <SafeAreaProvider>
            <ScrollView>
                <View style={styles.baseContainer}>
                    <View>
                        <Text style={styles.baseTitle}>{newName}</Text>
                    </View>

                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Information</Text>
                        <View style={styles.infoGrid}>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Author</Text>
                                <Text>N/A</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Category</Text>
                                <Text>N/A</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Prep Time</Text>
                                <Text>N/A</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Cook Time</Text>
                                <Text>N/A</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Total Time</Text>
                                <Text>N/A</Text>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoLabel}>Servings</Text>
                                <Text>N/A</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.baseContainer}>
                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Ingredients</Text>
                        <Text style={styles.h2}>Section</Text>
                        <View style={styles.baseChecklist}>
                            <BouncyCheckbox style={styles.baseChecklist}
                                onPress={(isChecked: boolean) => console.log(isChecked)}
                                text="e.g. 250g sugar"
                                iconStyle={{borderRadius:0}}
                                innerIconStyle={{borderRadius:0}}
                            />
                            <BouncyCheckbox style={styles.baseChecklist}
                                onPress={(isChecked: boolean) => console.log(isChecked)}
                                text="e.g. 50g unsalted butter"
                                iconStyle={{borderRadius:0}}
                                innerIconStyle={{borderRadius:0}}
                            />
                        </View>
                    </View>
                </View>
                
                <View style={styles.baseContainer}>
                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Instructions</Text>
                        
                    </View>
                </View>

                <View style={styles.baseContainer}>
                    <View style={styles.baseSubContainer}>
                        <Text style={styles.h1}>Notes</Text>
                        
                    </View>
                </View>

            </ScrollView>
        </SafeAreaProvider>
    )
};

export default RecipeBase;