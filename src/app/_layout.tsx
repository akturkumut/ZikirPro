import { NavigationBar } from "expo-navigation-bar";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <NavigationBar hidden style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
