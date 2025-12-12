import { Colors } from "@/constants/theme";
import { Tabs } from "expo-router";
import {
  BarChartIcon,
  CarFrontIcon,
  TagsIcon,
  UserCheckIcon,
  BanknoteIcon,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.azueRadiance500,
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 4,
          borderLeftWidth: 4,
          borderRightWidth: 4,
          borderColor: Colors.azueRadiance500,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 87,
          paddingBottom: 15,
          paddingTop: 20,
          paddingLeft: 24,
          paddingRight: 24,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "Outfit_500Medium",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <BarChartIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="voiture"
        options={{
          title: "Voiture",
          tabBarIcon: ({ color, size }) => (
            <CarFrontIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="vendeur"
        options={{
          title: "Vendeur",
          tabBarIcon: ({ color, size }) => (
            <TagsIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="lead"
        options={{
          title: "Lead",
          tabBarIcon: ({ color, size }) => (
            <UserCheckIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: "Finance",
          tabBarIcon: ({ color, size }) => (
            <BanknoteIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
