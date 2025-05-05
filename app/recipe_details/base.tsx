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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
    Link
} from 'expo-router';

const RecipeBase = () => {
    let recipeName: string = "New Recipe";
    let exampleIngredients = [
        {
            title: '250g Sugar'
        },
        {
            title: 'Pinch of Pepper'
        },
        {
            title: 'Pinch of Salt'
        }
    ];
     
    return (
        <SafeAreaProvider>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>{recipeName}</Text>
                    </View>

                    <View style={styles.subContainer}>
                        <Text style={styles.h1}>Information</Text>
                        <View style={styles.infoGrid}>
                            
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.subContainer}>
                        <Text style={styles.h1}>Ingredients</Text>
                        <View style={styles.checklist}>
                            <BouncyCheckbox style={styles.checklist}
                                isChecked={false}
                                text='e.g. 250g sugar'
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
                        <Text style={styles.body}>
                                Example Text
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaProvider>
    )
};

const styles=StyleSheet.create({
    container:{
        backgroundColor:'lightcoral',
        borderColor:'lightcoral',
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
        fontSize:30,
        fontWeight:'bold',
        marginTop:15,
        paddingBottom:20,
        textAlign:'center',
    },
    h1:{
        fontSize:26,
        paddingBottom:10,
        textAlign:'center'
    },
    infoGrid:{
        flex:2,
        fontSize:18,
        margin:10
    },
    gridRows:{
        flexDirection:"row"
    },
    gridColumns:{
        flex:2
    },
    checklist:{
        padding:5,
    }
});
export default RecipeBase;