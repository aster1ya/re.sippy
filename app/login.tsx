import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebaseConfig";

import { View, Text, TextInput, Button } from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";

const Login = () => {
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const HandleSubmitLogin = () => {
    LoginUser(emailInput, passwordInput);
  };

  const LoginUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user Logged in with email: ", user.email);
        router.back();
      })
      .catch((error) => {
        console.log("Login error");
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <View>
      <Text>Login to your account</Text>

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

      <Button title="login" onPress={HandleSubmitLogin} />

      <Link href="/login">Already have an account? login instead.</Link>
    </View>
  );
};

export default Login;
