import { Stack } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"; // Import necessary components
import React from "react";
import styles from "../styles";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen //this hides the header of every screen in the (drawer) folder
        name="(drawers)"
        options={{
          headerShown: false,
        }}
      />
      {/*
      {/* You can add buttons here or in the layout 
       <View style={styles.layoutContainer}>
        <Text style={styles.layoutTitle}>Welcome to the App!</Text>

        {/* Navigation Buttons as Round-Square Tabs 
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to Search screen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to Register screen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to Login screen</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </Stack>
  );
}

// Styles for the buttons and layout

