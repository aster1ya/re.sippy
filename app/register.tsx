import {
  createUserWithEmailAndPassword,
  validatePassword,
} from "firebase/auth";
import { auth } from "../backend/firebaseConfig";
import { RegisterUser } from "../controller";

import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import styles from "../styles";

const Register = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const HandleSubmitRegister = async () => {
    const { success, emailError, passwordError } = await RegisterUser(
      emailInput,
      passwordInput
    );
    if (success) {
      Alert.alert(
        "Account Registered",
        "Account successfully created and logged in."
      );
      router.back();
    } else {
      setEmailError(emailError);
      setPasswordError(passwordError);
    }
  };

  return (
    <ScrollView>
      <View style={styles.baseContainer}>
        <Text style={styles.h1}>Register your account</Text>

        <TextInput style={styles.authInput}
          placeholder="email"
          keyboardType="email-address"
          onChangeText={(newText) => setEmailInput(newText)}
        />
        <Text style={styles.authError} className="text-danger">
          {emailError}
        </Text>

        <TextInput style={styles.authInput}
          placeholder="password"
          onChangeText={(newText) => setPasswordInput(newText)}
        />
        <Text style={styles.authError} className="text-danger">
          {passwordError}
        </Text>

        <Button title="register" onPress={HandleSubmitRegister}
                color="tomato"/>
        <Text/>
        <Button title="Already have an account? Login here." onPress={() => router.replace("/login")}
                color="tomato"/>
      </View>
    </ScrollView>
  );
};

export default Register;
