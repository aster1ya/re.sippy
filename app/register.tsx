import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebaseConfig";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";

const Register = () => {
  const apiUrl = "http://localhost:5000/api";

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const HandleSubmitRegister = () => {
    RegisterUser(emailInput, passwordInput);
  };

  const RegisterUser = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user created");
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log("create user error");
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
      />

      <Button title="register" onPress={HandleSubmitRegister} />

      <Link href="/login">Already have an account? login instead.</Link>
    </View>
  );
};

export default Register;
