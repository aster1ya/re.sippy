import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { Component, useState } from "react";
import { ToggleFavorite } from "@/controller";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";

type SearchBarProps = {
  searchHandler(searchTerm: string): void;
};

const SearchBar = ({ searchHandler }: SearchBarProps) => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <View style={{ alignItems: "center", margin: 10, flex: 1 }}>
      <View
        style={[
          styles.indexSearchBarContainer,
          { backgroundColor: theme.inputBg },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={theme.placeholderColor}
          style={styles.indexSearchIconInline}
        />
        <TextInput
          style={[styles.indexSearchBar, { color: theme.textColor }]}
          placeholder="Search recipes..."
          placeholderTextColor={theme.placeholderColor}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => {
            // if (searchText.trim()) {
            searchHandler(searchText.trim());
            // }
          }}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const theme = {
  placeholderColor: "#707070",
  textColor: "#000000",
  inputBg: "#E8E8E8",
};
