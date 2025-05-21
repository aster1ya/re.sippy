import {
  createUserWithEmailAndPassword,
  validatePassword,
} from "firebase/auth";
import { auth } from "../backend/firebaseConfig";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import styles from "@/styles";

const Register = () => {
  const apiUrl = "http://localhost:5000/api";

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const HandleSubmitRegister = async () => {
    RegisterUser(emailInput, passwordInput);
  };

  const RegisterUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //after logged in, goes to login page
        const user = userCredential.user;
        console.log("user created with email: ", user.email);
        router.replace("/login");
      })
      .catch((error) => {
        console.log("create user error");
        console.log(error.code);
        console.log(error.message);

        //uses the error codes to check if email is invalid. ignores if password is invalid
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/missing-email":
            setEmailError("Email must be in correct format.");
            break;
          case "auth/password-does-not-meet-requirements":
          case "auth/weak-password":
          case "auth/missing-password":
            setEmailError("");
            break;
          default:
            setEmailError(
              "Unhandled error: " + error.code + " " + error.message
            );
            break;
        }

        //only get one error code at a time, so checking for password validation separately
        validatePassword(auth, passwordInput).then((status) => {
          if (!status.isValid) {
            setPasswordError("Password must be at least 6 characters.");
          } else {
            setPasswordError("");
          }
        });
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

      <Link href="/login" style={styles.authLink}>
        {"\n"}Already have an account? login instead.
      </Link>
    </View>
  );
};

export default Register;