import { Stack } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"; // Import necessary components

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen // this hides the header of every screen in the (drawer) folder
        name="(drawers)"
        options={{
          headerShown: false,
        }}
      />

      {/* You can add buttons here or in the layout */}
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the App!</Text>

        {/* Navigation Buttons as Round-Square Tabs */}
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
      </View>
    </Stack>
  );
}

// Styles for the buttons and layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#4CAF50", // Green background for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Makes the button round-squared
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // For shadow effect on Android
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 14,
    fontWeight: "bold",
  },
});
