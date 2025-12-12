import { Colors } from "@/constants/theme";
import {
  Bell,
  BellIcon,
  CircleEllipsisIcon,
  ListFilterIcon,
  SearchIcon,
} from "lucide-react-native";
import React from "react";
import { Pressable, TextInput, View } from "react-native";

type VoitureScreenHeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};
const VoitureScreenHeader = ({
  searchQuery,
  setSearchQuery,
}: VoitureScreenHeaderProps) => {
  return (
    <View className="flex flex-row items-center gap-6 h-[46px]">
      <View className="flex-1 self-stretch flex flex-row items-center gap-2">
        <View className="flex-1 flex flex-row items-center bg-transparent px-3 py-[13px] gap-2 rounded-4xl border border-input-placeholder">
          <SearchIcon size={20} color={Colors.lynchGray400} />

          <TextInput
            className="flex-1 self-stretch p-0  font-outfit-regular text-base"
            style={{ color: "#000000" }}
            placeholder="Rechercher une voiture..."
            placeholderTextColor={Colors.lynchGray400}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Pressable className="self-stretch w-[46px] bg-transparent border-azue-radiance-500 border rounded-full flex items-center justify-center">
          <ListFilterIcon size={17} color={Colors.azueRadiance500} />
        </Pressable>
      </View>

      <View className="flex flex-row items-center gap-4">
        <Pressable onPress={() => {}}>
          <BellIcon size={17} color={"#212121"} />
        </Pressable>
        <Pressable onPress={() => {}}>
          <CircleEllipsisIcon size={21} color={"#212121"} />
        </Pressable>
      </View>
    </View>
  );
};

export default VoitureScreenHeader;
