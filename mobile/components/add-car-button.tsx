import { PlusIcon } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";
import { router } from "expo-router";

const AddCarButton = () => {
  return (
    <Pressable
      onPress={() => router.push("/add-car")}
      className="flex items-center justify-center bg-azue-radiance-500 h-[84px] w-[84px] rounded-full border-[5px] border-white absolute right-[25px] bottom-[13px]"
    >
      <PlusIcon color={"white"} size={18} />
    </Pressable>
  );
};

export default AddCarButton;
