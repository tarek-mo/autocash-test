import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { Colors } from "@/constants/theme";

interface InputProps extends TextInputProps {
  hasError?: boolean;
  rightIcon?: React.ReactNode;
}

export default function Input({
  hasError,
  rightIcon,
  className,
  ...props
}: InputProps) {
  if (rightIcon) {
    return (
      <View
        className={`flex-row items-center bg-[#F2F5FA] px-4 py-[18px] rounded-xl ${
          hasError ? "border-2 border-red-500" : ""
        } ${className || ""}`}
      >
        <TextInput
          className="flex-1 text-black text-sm font-outfit-medium"
          placeholderTextColor={Colors.lynchGray400}
          {...props}
          style={[
            {
              paddingVertical: 0,
              paddingHorizontal: 0,
            },
            props.style,
          ]}
        />
        {rightIcon}
      </View>
    );
  }

  return (
    <TextInput
      className={`bg-[#F2F5FA] px-4 py-[18px] rounded-xl text-black text-sm font-outfit-medium ${
        hasError ? "border-2 border-red-500" : ""
      } ${className || ""}`}
      placeholderTextColor={Colors.lynchGray400}
      {...props}
      style={[
        {
          paddingVertical: 0,
          paddingHorizontal: 0,
        },
      ]}
    />
  );
}
