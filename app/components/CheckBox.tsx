import React from "react";
import { StyleSheet } from "react-native";
import ExpoCheckBox from "expo-checkbox";
import { PRIMARY } from "../theme/color-tokens";

export const CheckBox = ({
  value,
  onValueChange,
  color = PRIMARY,
  customStyle = {},
}) => {
  return (
    <ExpoCheckBox
      value={value}
      onValueChange={onValueChange}
      style={[styles.checkBox, customStyle]}
      color={color}
    />
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
});

export default CheckBox;
