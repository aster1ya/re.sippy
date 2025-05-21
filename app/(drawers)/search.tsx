import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <Link href="/results" style={styles.link}>Go to Results</Link>
    </View>
  )
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: 'blue',
  },
})
