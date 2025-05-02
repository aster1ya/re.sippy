import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebaseConfig";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

const Register = () => {
  const apiUrl = "http://localhost:5000/api";

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const navigation = useNavigation();

  const HandleSubmitRegister = () => {
    RegisterUser(emailInput, passwordInput);
  };

  const RegisterUser = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user created with email: ", user.email);
        //navigation.navigate("Index");
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
