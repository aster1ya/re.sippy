import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        Wow its the front page can you believe it? Try writing different text
        here and saving it to see the app update live.
      </Text>
    </View>
  );
}
