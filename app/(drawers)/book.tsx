import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import Card from '../card'
import axios from 'axios'

const book = () => {

  //copied over code to experiment
  const apiUrl = "http://localhost:5000/api/recipes";

  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(apiUrl); //this axios.get() looks at the backend (server.js) and does the GET function with the /api/recipes route
      setRecipes(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

 //new code to try and display the data as separate cards (also with card.tsx)
  const cards = () => {
    return recipes.map((recipe,index) => (<Card key={recipes._id} recipes={recipes}/>));
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center',
    },
  })

  return(
    <View style={styles.container}>
      {cards()}
    </View>
  )
}

export default book