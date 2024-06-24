import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../services/utils/colors";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import OptionsMenu from "./OptionsMenu";
import BackArrowButton from "./BackArrowButton";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PRIMARY_WHITE, TEXT_DARK_100 } from "../theme/color-tokens";

interface Option {
  label: string;
  icon: IconProp;
  onPress: () => void;
}

interface HeaderProps {
  title: string;
  secondaryActionIcon?: IconProp;
  onSecondaryAction?: () => void;
  options?: Option[];
  onPrimaryAction?: () => void;
  onBackArrowPress?: () => void;
  isOptionsMenuOpen?: boolean;
  handleOptionsMenuClose?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  secondaryActionIcon,
  onPrimaryAction,
  onSecondaryAction,
  options,
  onBackArrowPress,
  isOptionsMenuOpen,
  handleOptionsMenuClose,
}) => {
  const navigation = useNavigation();

  const handleLeftArrowPress = () => {
    if (onBackArrowPress) onBackArrowPress();
    else navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leadingContainer}>
        <BackArrowButton onPress={handleLeftArrowPress} />
        <Text style={[styles.headerText]}>{title}</Text>
      </View>
      <View style={styles.trailingContainer}>
        {secondaryActionIcon && (
          <Pressable
            onPress={onSecondaryAction}
            style={styles.actionIcon}
          >
            <FontAwesomeIcon
              icon={secondaryActionIcon}
              size={22}
              color={Colors.Text100}
            />
          </Pressable>
        )}
        {options && (
          <>
            <Pressable
              onPress={onPrimaryAction}
              style={styles.actionIcon}
            >
              <FontAwesomeIcon
                icon="ellipsis-vertical"
                size={22}
                color={Colors.Text100}
              />
            </Pressable>
            <OptionsMenu
              isOpen={isOptionsMenuOpen}
              onClose={handleOptionsMenuClose}
              options={options}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY_WHITE,
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  leadingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  headerText: {
    fontSize: 16,
    fontWeight: "500",
    color: TEXT_DARK_100,
  },

  trailingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  actionIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
    padding: 12,
  },
});

export default Header;
