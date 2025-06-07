import React, { useEffect, useState } from "react";
import { 
  Alert,
  Button,
  ScrollView,
  Text, 
  TextInput, 
  View, } from "react-native";
  import { RegisterUser } from "../controller";

import { auth } from "../backend/firebaseConfig";
import { createUserWithEmailAndPassword, validatePassword } from "firebase/auth";
import { useRouter } from "expo-router";

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

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.authInput}
          onChangeText={(newText) => setEmailInput(newText)}
        />
        <Text 
          className="text-danger"
          style={styles.authError}>
          {emailError}
        </Text>

        <TextInput
          placeholder="Password"
          style={styles.authInput}
          onChangeText={(newText) => setPasswordInput(newText)}
        />
        <Text 
          className="text-danger"
          style={styles.authError}>
          {passwordError}
        </Text>

        <Button 
          title="register"
          color="tomato"
          onPress={HandleSubmitRegister}/>
        <Text/>
        <Button 
          title="Already have an account? Login here."
          color="tomato"
          onPress={() => router.replace("/login")}/>
      </View>
    </ScrollView>
  );
};

export default Register;
