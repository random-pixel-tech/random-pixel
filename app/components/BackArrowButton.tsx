import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "../services/utils/colors";
import { Pressable, StyleSheet } from "react-native";

interface BackArrowButtonProps {
  onPress: () => void;
}

const BackArrowButton: React.FC<BackArrowButtonProps> = ({
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <FontAwesomeIcon
        icon="arrow-left"
        size={24}
        color={Colors.Text100}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 48,
    height: 48,
    padding: 12,
  },
});

export default BackArrowButton;
