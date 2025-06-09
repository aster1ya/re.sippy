import React, { useEffect, useState } from "react";
import {
  Button,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { 
  SearchRecipes, 
  GetRecipeById,
} from "../controller";
import CustomSearchBar from "../components/CustomSearchBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import { auth } from "../backend/firebaseConfig";
import { User } from "firebase/auth";
import { router } from "expo-router";

import IRecipe from "../types/Recipe";
import styles from "../styles";

const Index = () => {
  const apiUrl = "http://localhost:5000/api/recipes";

  const [recipes, setRecipes] = useState([]);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchText, setSearchText] = useState("");
  const [index, setIndex] = useState(0);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(apiUrl);
      setRecipes(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  //need to have this auth observer with a useState on every page that needs to have auth updated without the page being recreated e.g. you dont need it on the profile page because updating auth (logging out) would involve going back to index and unloading the page, but you do need it on Index because it always exists at the bottom of the stack.
  //for pages without the observer, just use the import. const user = auth.currentUser
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      console.log("auth updated: ", user?.email);
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

  const goToBook = () => {
    router.push({
      pathname: "/book",
    });
  };

  const goToCreate = () => {
    router.push({
      pathname: "/create",
    });
  };

  //TESTING FUNCTION FOR SearchRecipes() IN controller.tsx
  //ALSO UNCOMMENT THE TEST BUTTON TO TEST THIS FUNCTION
  //
  // const testFunction = async () => {
  //   const recipes: IRecipe[] = await SearchRecipes({
  //     title: "izz",
  //     tags: ["both"],
  //   });
  //   console.log("RECIPE OUTPUT:");
  //   console.log(recipes);
  //   // for (let i = 0; i < recipes.; i++) {
  //   //   console.log(recipes[i].title);
  //   // }
  // };

  return (
    <SafeAreaProvider>
      <View style={styles.indexSafeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
        />

        <Text style={styles.indexUserStatus}>
          {currentUser ? (
            "currently logged in as \n" + currentUser?.email
          ) : (
            "not logged in to re.sippy"
          )}
        </Text>

        <View style={styles.indexHeader}>
          <View style={styles.indexTopRowInline}>
            <CustomSearchBar
              searchHandler={(searchTerm) => {
                router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
              }}
            />

            {currentUser ? (
              <Button 
                title={"Sign\nOut"}
                color="tomato"
                onPress={handleSignOut}/>
            ) : (
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Ionicons
                  name="person-circle-outline"
                  color="tomato"
                  size={32}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.indexContainer}>
          <Text style={styles.indexAppTitle}>re.sippy</Text>
          <Text style={styles.indexWelcome}>
            {currentUser ? (
              "Welcome back,\n" + 
              currentUser?.email + "!"
            ) : (
              "Welcome,\nGuest!"
            )}
          </Text>

          { 
          //LOTS OF BLANK SPACE HERE
          //MIGHT BE GOOD TO ADD SOMETHING IF WE HAVE TIME
          }
        </View>

        {/* TEST BUTTON FOR SearchRecipes() */}
        {/* <Button title="test" onPress={testFunction} /> */}

        <View style={styles.indexTabContainer}>
          {/* <TouchableOpacity onPress={() => router.push("/book")}>
            <View style={styles.indexTabButton}>
              <Ionicons
                name="book"
                color="white"
                size={24}
                style={styles.indexTabIcon}
              />
              <Text style={styles.indexTabLabel}>Recipe Book</Text>
            </View>
          </TouchableOpacity> */}
          <Button
              title="Recipe Book"
              color="tomato"
              onPress={goToBook}
          />

          {currentUser ? (
            <Button
              title="Create Recipe"
              color="tomato"
              onPress={goToCreate}
            />
          ) : (
            <>
            </>
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Index;