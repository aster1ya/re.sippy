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
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>{newName}</Text>
                    </View>

                    <View style={styles.subContainer}>
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

                <View style={styles.container}>
                    <View style={styles.subContainer}>
                        <Text style={styles.h1}>Ingredients</Text>
                        <Text style={styles.h2}>Section</Text>
                        <View style={styles.checklist}>
                            <BouncyCheckbox style={styles.checklist}
                                onPress={(isChecked: boolean) => console.log(isChecked)}
                                text="e.g. 250g sugar"
                                iconStyle={{borderRadius:0}}
                                innerIconStyle={{borderRadius:0}}
                            />
                            <BouncyCheckbox style={styles.checklist}
                                onPress={(isChecked: boolean) => console.log(isChecked)}
                                text="e.g. 50g unsalted butter"
                                iconStyle={{borderRadius:0}}
                                innerIconStyle={{borderRadius:0}}
                            />
                        </View>
                    </View>
                </View>
                
                <View style={styles.container}>
                    <View style={styles.subContainer}>
                        <Text style={styles.h1}>Instructions</Text>
                        
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.subContainer}>
                        <Text style={styles.h1}>Notes</Text>
                        
                    </View>
                </View>

            </ScrollView>
        </SafeAreaProvider>
    )
};

//stylesheet for UI components
const styles=StyleSheet.create({
    container:{
        backgroundColor:'lightsalmon',
        borderColor:'lightsalmon',
        borderRadius:10,
        borderWidth:2.5,
        flex:1,
        margin:10,
        padding:10
    },
    subContainer:{
        backgroundColor:'whitesmoke',
        borderColor:'whitesmoke',
        borderRadius:5,
        borderWidth:5,
        padding:10
    },
    body:{
        fontSize:18,
        margin:10,
        textAlign:'left'
    },
    title:{
        flex:1,
        flexDirection:'row',
        fontSize:30,
        fontWeight:'bold',
        marginTop:10,
        paddingBottom:20,
        textAlign:'center'
    },
    h1:{
        fontSize:26,
        paddingBottom:10,
        textAlign:'center'
    },
    h2:{
        fontSize:20,
        paddingBottom:10,
        textAlign:'left'
    },
    infoGrid:{
        alignItems:'flex-start',
        flex:3,
        flexDirection:'row',
        flexWrap:'wrap',
        fontSize:18,
        margin:10
    },
    infoSection:{
        alignItems:'center',
        padding:5,
        width:'50%'
    },
    infoLabel:{
        fontWeight:'bold'
    },
    checklist:{
        padding:5,
    }
});
export default RecipeBase;