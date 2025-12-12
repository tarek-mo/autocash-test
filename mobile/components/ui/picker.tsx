import React from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";
import { ChevronDown } from "lucide-react-native";
import { Colors, Fonts } from "@/constants/theme";

interface CustomPickerProps extends Omit<PickerSelectProps, "items"> {
  hasError?: boolean;
  children?: React.ReactNode;
  selectedValue?: string | number;
  enabled?: boolean;
}

export default function CustomPicker({
  hasError,
  children,
  selectedValue,
  enabled = true,
  ...props
}: CustomPickerProps) {
  const items = React.Children.toArray(children).map((child: any) => ({
    label: child.props.label,
    value: child.props.value,
    key: child.props.value,
  }));

  return (
    <View
      className={`bg-[#F2F5FA] rounded-xl ${
        hasError ? "border-2 border-red-500" : ""
      }`}
    >
      <RNPickerSelect
        items={items}
        value={selectedValue}
        disabled={!enabled}
        useNativeAndroidPickerStyle={false}
        fixAndroidTouchableBug={true}
        style={{
          inputIOS: {
            fontSize: 14,
            paddingVertical: 18,
            paddingHorizontal: 16,
            color: "#000",
            fontFamily: "Outfit_500Medium",
            paddingRight: 40,
            backgroundColor: "transparent",
          },
          inputAndroid: {
            fontSize: 14,
            paddingVertical: 18,
            paddingHorizontal: 16,
            color: "#000",
            fontFamily: "Outfit_500Medium",
            paddingRight: 40,
            backgroundColor: "transparent",
          },
          inputWeb: {
            fontSize: 14,
            paddingVertical: 18,
            paddingHorizontal: 16,
            color: "#000",
            fontFamily: "Outfit_500Medium",
            paddingRight: 40,
            backgroundColor: "transparent",
          },
          iconContainer: {
            top: 14,
            right: 16,
          },
          placeholder: {
            color: Colors.lynchGray400,
            fontFamily: "Outfit_500Medium",
          },
        }}
        Icon={() => <ChevronDown size={20} color="black" />}
        {...props}
      />
    </View>
  );
}
