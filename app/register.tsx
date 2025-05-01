import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebaseConfig";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";

import axios from "axios";

const register = () => {
  const apiUrl = "http://localhost:5000/api";

  const HandleSubmitRegister = () => {
    RegisterUser("email@email.com", "password1234");
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

      <TextInput placeholder="email" />
      <TextInput placeholder="password" />

      <Button title="register" onPress={HandleSubmitRegister} />

      <Link href="/login">Already have an account? login instead.</Link>
    </View>
  );
};

export default register;
