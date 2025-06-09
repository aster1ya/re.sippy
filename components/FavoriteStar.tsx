import React, { Component, useState } from "react";
import { 
  Button,
  StyleSheet,
  Text, 
  TouchableOpacity, View, } from "react-native";
import { 
  ToggleFavorite,
} from "@/controller";
import AntDesign from "@expo/vector-icons/AntDesign";

type FavoriteStarProps = {
  isFavorited: boolean;
  uid: string;
  recipeId: string;
};

const FavoriteStar = ({ isFavorited, uid, recipeId }: FavoriteStarProps) => {
  const [highlightStar, setHighlightStar] = useState<boolean>(isFavorited);

  const handleToggleRecipe = async () => {
    const { favorited } = await ToggleFavorite(uid, recipeId);
    setHighlightStar(favorited);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleToggleRecipe}>
        <AntDesign
          name={highlightStar ? "star" : "staro"}
          color={"#f0be1d"}
          size={48}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteStar;

const styles = StyleSheet.create({
  FavoritedButton: {
    backgroundColor: "#c9c9c9",
    color: "#000000",
  },

  UnfavoritedButton: {
    backgroundColor: "#f0be1d",
    color: "#ffffff",
  },
});
