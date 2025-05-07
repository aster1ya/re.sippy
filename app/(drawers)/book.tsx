import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Link } from 'expo-router'
import Index from '..'

const book = () => {
  return (
    <View>
      <Text>My Recipes</Text>
      <Link href="../recipe_details/pancakes">go to Details screen of Pancake</Link>
      <Link href="../recipe_details/ramen">go to Details screen of Ramen</Link>
    </View>
  )
}

export default book