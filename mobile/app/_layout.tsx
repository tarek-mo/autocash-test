import "./../global.css";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";

import { StatusBar } from "expo-status-bar";
import {
  Outfit_400Regular,
  Outfit_300Light,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
  const [loaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_300Light,
  });

  if (!loaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-main-gray font-outfit-regular">
      <StatusBar style="dark" translucent={false} />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
