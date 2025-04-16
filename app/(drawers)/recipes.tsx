import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const recipes = () => {
  return (
    <View>
      <Text>My Recipes</Text>
      <Link href="../recipe_details/pancakes">go to Details screen of Pancake</Link>
      <Link href="../recipe_details/ramen">go to Details screen of Ramen</Link>
    </View>
  )
}

export default recipes

