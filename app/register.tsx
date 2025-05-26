import {
  createUserWithEmailAndPassword,
  validatePassword,
} from "firebase/auth";
import { auth } from "../backend/firebaseConfig";
import { RegisterUser } from "../controller";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import styles from "../styles";

const Register = () => {
  const apiUrl = "http://localhost:5000/api";

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
      router.replace("/login");
    } else {
      setEmailError(emailError);
      setPasswordError(passwordError);
    }
  };

  return (
    <View>
      <Text>Register your account</Text>

      <TextInput
        placeholder="email"
        keyboardType="email-address"
        onChangeText={(newText) => setEmailInput(newText)}
      />
      <Text style={styles.authError} className="text-danger">
        {emailError}
      </Text>

      <TextInput
        placeholder="password"
        onChangeText={(newText) => setPasswordInput(newText)}
      />
      <Text style={styles.authError} className="text-danger">
        {passwordError}
      </Text>

      <Button title="register" onPress={HandleSubmitRegister} />

      <Link href="/login" style={styles.hyperlink}>
        {"\n"}Already have an account? login instead.
      </Link>
    </View>
  );
};

export default Register;
