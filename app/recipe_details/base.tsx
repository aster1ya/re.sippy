import React from 'react';
import {
    Button,
    Image,
    ScrollView,
    SectionList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    SafeAreaProvider
} from 'react-native-safe-area-context';
import {
    Link
} from 'expo-router';

const RecipeBase = () => {
    let recipeName: string = "New Recipe";
    let exampleIngredients = [
        {
            title: 'Salt',
        }
    ];
    
    return (
        <SafeAreaProvider>
            <ScrollView>

                <View>
                    <Text style={styles.title}>{recipeName}</Text>
                </View>

                <View>
                    <Image

                    />
                </View>

                <View style={styles.container}>
                    <View>
                        <Text style={styles.h1}>Information</Text>
                    </View>
                    <View>
                        <Text style={styles.body}>
                            Example Text
                        </Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <View>
                        <Text style={styles.h1}>Ingredients</Text>
                    </View>
                    <View>

                    </View>
                </View>
                
                <View style={styles.container}>
                    <View>
                        <Text style={styles.h1}>Instructions</Text>
                        <View>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <View>
                        <Text style={styles.h1}>Notes</Text>
                        <View>
                            <Text style={styles.body}>
                                Example Text
                            </Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaProvider>
    )
};

const styles=StyleSheet.create({
    container:{
        padding:10
    },
    body:{
        fontSize:18,
        margin:10,
        textAlign:'left'
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:15,
        textAlign:'center',
    },
    h1:{
        fontSize:26,
        textAlign:'center'
    }
});
export default RecipeBase;