import { Text, View } from "react-native";
import { useState } from "react";
import HomeTabs from "@/components/home-tabs";
import AllCars from "@/components/all-cars";
import VoitureScreenHeader from "@/components/voiture-screen-header";
import AddCarButton from "@/components/add-car-button";

export default function VoitureScreen() {
  const [tab, setTab] = useState<"All Cars" | "My Cars">("All Cars");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View className="flex-1 px-3 pt-16 mb-5 relative">
      <VoitureScreenHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <HomeTabs currentTab={tab} setTab={setTab} />
      <View className="">
        {tab === "All Cars" && <AllCars searchQuery={searchQuery} />}

        {tab === "My Cars" && (
          <View>
            <Text className="mt-2 text-gray-600">
              Outside the scope of this test.
            </Text>
          </View>
        )}
      </View>
      <AddCarButton />
    </View>
  );
}
