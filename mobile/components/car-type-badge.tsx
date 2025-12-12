import { VoitureType } from "@/types/GetAllVoitures";
import React from "react";
import { Text, View } from "react-native";

type CarTypeBadgeProps = {
  type: VoitureType;
};
const CarTypeBadge = ({ type }: CarTypeBadgeProps) => {
  return (
    <View
      className={`px-3 py-1 min-w-[75px] flex items-center justify-center rounded-2xl border-2 ${
        type === VoitureType.PUBLISHED
          ? "border-caribbean-green-500 bg-caribbean-green-50"
          : "border-purple-heart-500 bg-purple-heart-50"
      }`}
    >
      <Text
        className={`font-outfit-medium text-xs ${
          type === VoitureType.PUBLISHED
            ? "text-caribbean-green-500"
            : "text-purple-heart-500"
        }`}
      >
        {type === VoitureType.PUBLISHED ? "Publié" : "Expertisé"}
      </Text>
    </View>
  );
};

export default CarTypeBadge;
