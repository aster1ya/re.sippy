import { Link } from "expo-router";
import { Text, View} from "react-native";
import 'react-native-gesture-handler' //makes drawers work

const Index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Wow its the front screen can you believe it?</Text>
      <Text>
        Try writirng different text here and saving it to see the app update
        live. You may need to press 'r' in the terminal before hot reload starts
        working.
      </Text>
      <Link href="/search">go to Search screen</Link>
      <Link href="/register">go to Register screen</Link>
      <Link href="/login">go to Login screen</Link>

    </View>
  );
}

export default Index;
