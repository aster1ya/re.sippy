import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";

import axios from "axios";

const register = () => {
  const apiUrl = "http://localhost:5000/api";

  const HandleSubmitRegister = () => {
    RegisterUser();
    //useEffect(function () {});
  };

  const RegisterUser = async () => {
    const response = await axios
      .post(apiUrl + "/register", {
        username: "namee",
        password: "passss", //needs to be encrypted, see tutorial
        email: "eeeemail",
      })
      .then(function (response) {
        console.log("User api called");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View>
      <Text>Register your account</Text>

      <TextInput placeholder="username" />
      <TextInput placeholder="password" />

      <Button title="register" onPress={HandleSubmitRegister} />

      <Link href="/login">Already have an account? login instead.</Link>
    </View>
  );
};

export default register;
