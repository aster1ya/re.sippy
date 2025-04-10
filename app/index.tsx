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
      <Text>Wow its the front page can you believe it?</Text>
      <Text>
        Try writirng different text here and saving it to see the app update
        live. You may need to press 'r' in the terminal before hot reload starts
        working.
      </Text>
    </View>
  );
}
