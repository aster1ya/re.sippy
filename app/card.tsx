import React from "react";
import { 
  Text, 
  View 
} from "react-native";
import recipes from "./(drawers)/recipes";

function Card({ recipes }) {
  return (
    <View>
      <Text>
        {recipes.id}
        {recipes.name}
      </Text>
    </View>
  );
}

export default Card;
