import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebaseConfig";

import { View, Text, TextInput, Button } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const HandleSubmitLogin = () => {
    LoginUser(emailInput, passwordInput);
  };

  const LoginUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user Logged in");
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log("Login error");
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <View>
      <Text>Register your account</Text>

      <TextInput
        placeholder="email"
        keyboardType="email-address"
        onChangeText={(newText) => setEmailInput(newText)}
      />
      <TextInput
        placeholder="password"
        onChangeText={(newText) => setPasswordInput(newText)}
        secureTextEntry
      />

      <Button title="register" onPress={HandleSubmitLogin} />

      <Link href="/login">Already have an account? login instead.</Link>
    </View>
  );
};

export default Login;
