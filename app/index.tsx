import { Link } from "expo-router";
import { Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-native-gesture-handler"; //makes drawers work

import { auth } from "../backend/firebaseConfig";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const Index = () => {
  const apiUrl = "http://localhost:5000/api/recipes";

  //create a variable which can be used in the page
  const [recipes, setRecipes] = useState([]);
  const [currentUserUid, setCurrentUserUid] = useState<string | null>("");

  //function to do API call to get all recipes
  //Remember you need to run backend/server.js in a new terminal to make the backend work
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(apiUrl); //this axios.get() looks at the backend (server.js) and does the GET function with the /api/recipes route
      setRecipes(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //call the function to get recipes
  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserUid(user.uid);
      } else {
        setCurrentUserUid("not signed in");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log("sign out error: ", error.message);
      });
  };

  //typescript that gets shown on the screen goes here
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Wow its the front screen can you believe it?</Text>
      <Text>
        Try writirng different text here and saving it to see the app update
        live. You may need to press 'r' in the terminal before hot reload starts
        working. {"\n"}
      </Text>

      <Text>Links:</Text>
      <Link href="/search">go to Search screen</Link>
      <Link href="/register">go to Register screen</Link>
      <Link href="/login">go to Login screen</Link>

      <Text>{"\n"}Recipes from the database:</Text>
      {recipes.map((recipe, index) => (
        <Text key={index}>
          {index}. {recipe["title"]} - {recipe["ingredients"]}
        </Text> //idk how to remove these errors, but it works as expected
      ))}

      <Text>{"\n"}Logged In Status:</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>UID:{currentUserUid}</Text>

      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

export default Index;
