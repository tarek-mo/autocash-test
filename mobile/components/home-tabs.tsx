import { View, Text, Pressable } from "react-native";

type HomeTabsProps = {
  currentTab: "All Cars" | "My Cars";
  setTab: (tab: "All Cars" | "My Cars") => void;
};
const HomeTabs = ({ currentTab, setTab }: HomeTabsProps) => {
  return (
    <View className="flex mt-4 mb-6 flex-row gap-1.5 bg-white border-white border-[6px] rounded-full  text-sm font-outfit-medium">
      <Pressable
        onPress={() => setTab("All Cars")}
        className={`
            h-[52px] flex-1 px-2.5 flex items-center justify-center rounded-full
            ${currentTab === "All Cars" ? "bg-azue-radiance-500" : ""}
          `}
      >
        <Text
          className={currentTab === "All Cars" ? "text-white" : "text-black"}
        >
          Tous les voitures
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setTab("My Cars")}
        className={`
            h-[52px] flex-1 px-2.5 flex items-center justify-center rounded-full
            ${currentTab === "My Cars" ? "bg-azue-radiance-500" : ""}
          `}
      >
        <Text
          className={currentTab === "My Cars" ? "text-white" : "text-black"}
        >
          Mes Voitures
        </Text>
      </Pressable>
    </View>
  );
};

export default HomeTabs;
