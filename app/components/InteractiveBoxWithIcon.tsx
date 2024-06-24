import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Colors } from "../services/utils/colors"; // Assuming you have a Colors utility
import {
  SECONDARY_LIGHT_50,
  TEXT_LIGHT_100,
} from "../theme/color-tokens";

interface InteractiveBoxWithIconProps {
  onPress?: () => void;
  title: string;
  icon: IconProp;
  disabled?: boolean;
}

const InteractiveBoxWithIcon: React.FC<
  InteractiveBoxWithIconProps
> = ({ onPress, title, icon, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.box, disabled && styles.disabledBox]}>
        <View style={styles.center}>
          <FontAwesomeIcon
            icon={icon}
            size={40}
            color={disabled ? Colors.TextLight100 : Colors.Text100}
          />
          <Text
            style={[
              styles.text,
              {
                color: disabled
                  ? Colors.TextLight100
                  : Colors.Text100,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#e6e6ff", // Adjust as needed
    aspectRatio: 1,
    borderRadius: 10,
    padding: 16,
    width: 150, // Adjust as needed for different screen sizes
  },
  disabledBox: {
    color: TEXT_LIGHT_100,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default InteractiveBoxWithIcon;
