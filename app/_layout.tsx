import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen //this hides the header of every screen in the (drawer) folder
        name="(drawers)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
