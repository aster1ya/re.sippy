import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebaseConfig";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import styles from "../styles";

const Login = () => {
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [loginError, setLoginError] = useState("");

  const HandleSubmitLogin = () => {
    LoginUser(emailInput, passwordInput);
  };

  const LoginUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user Logged in with email: ", user.email);

        //show login success alert, then go back to index
        ShowSuccessAlert(email);
        router.back();
      })
      .catch((error) => {
        console.log("Login error");
        console.log(error.code);
        console.log(error.message);

        //handle login errors
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/missing-email":
          case "auth/missing-password":
          case "auth/invalid-credential":
            setLoginError("Email and password do not match.");
            break;
          default:
            setLoginError(
              "Unhandled error: " + error.code + " " + error.message
            );
            break;
        }
      });
  };

  const ShowSuccessAlert = (loggedInEmail: string) =>
    Alert.alert("Logged in", "Successfully logged in with " + loggedInEmail);

  return (
    <ScrollView>
      <View
        style={styles.baseContainer}>
        <Text style={styles.h1}>Login to your account</Text>

        <TextInput style={styles.authInput}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(newText) => setEmailInput(newText)}
        />
        <TextInput style={styles.authInput}
          placeholder="Password"
          onChangeText={(newText) => setPasswordInput(newText)}
          secureTextEntry
        />
        <Text style={styles.authError}>{loginError}</Text>

        <Button title="login" onPress={HandleSubmitLogin}
                color="tomato" />
        <Text/>
        <Button title="Don't have an account? Create one here." onPress={() => router.replace("/register")}
                color="tomato"/>
      </View>
    </ScrollView>
  );
};

export default Login;
