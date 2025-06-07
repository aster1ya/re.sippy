import React, { useEffect, useState} from "react";
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { auth } from "../backend/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";

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

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.authInput}
          onChangeText={(newText) => setEmailInput(newText)}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(newText) => setPasswordInput(newText)}
          style={styles.authInput}
          secureTextEntry
        />
        <Text style={styles.authError}>{loginError}</Text>

        <Button 
          title="login" 
          color="tomato"
          onPress={HandleSubmitLogin}
        />
        <Text/>
        <Button 
          title="Don't have an account? Create one here."
          color="tomato"
          onPress={() => router.replace("/register")}
        />
      </View>
    </ScrollView>
  );
};

export default Login;
