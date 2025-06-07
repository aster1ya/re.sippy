import React, { Component, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { 
  ToggleFavorite,
} from "@/controller";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles";

type SearchBarProps = {
  searchHandler(searchTerm: string): void;
};

const SearchBar = ({ searchHandler }: SearchBarProps) => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
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
          placeholder="Search Recipes..."
          placeholderTextColor={theme.placeholderColor}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => {
            if (searchText.trim()) {
              searchHandler(searchText);
            }
          }}
          style={[styles.indexSearchBar, { color: theme.textColor }]}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const theme = {
  placeholderColor: "#ccc",
  textColor: "#fff",
  inputBg: "#444",
};
