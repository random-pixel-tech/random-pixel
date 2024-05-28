import React, { useContext, useState } from "react";
import { Box, Text, Pressable } from "@gluestack-ui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../services/utils/colors";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import OptionsMenu from "./OptionsMenu";
import ConfirmationDialog from "./ConfirmationDialog";
import BackArrowButton from "./BackArrowButton";
import { CaptureAttendanceContext } from "../services/utils/api/useAttendanceLogic";

interface Option {
  label: string;
  icon: IconProp;
  onPress: () => void;
}

interface HeaderProps {
  title: string;
  secondaryActionIcon?: IconProp;
  onSecondaryAction?: () => void;
  showConfirmation?: boolean;
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  confirmationHeading?: string;
  confirmationText?: string;
  options?: Option[];
  onPrimaryAction?: () => void;
  onBackArrowPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  secondaryActionIcon,
  showConfirmation = false,
  setShowConfirmation,
  onPrimaryAction,
  onSecondaryAction,
  confirmationHeading = "",
  confirmationText = "",
  options,
  onBackArrowPress,
}) => {
  const {
    handleSaveAttendance,
    toggleAttendanceCaptureMenu,
    checkAttendanceChanges,
    isOptionsMenuOpen,
    handleOptionsMenuClose,
    checkChanges,
  } = useContext(CaptureAttendanceContext);

  const navigation = useNavigation();

  const handleLeftArrowPress = () => {
    if (onBackArrowPress) onBackArrowPress();
    else navigation.goBack();
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    navigation.goBack();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <Box
      bg="$pixWhite"
      w="$full"
      h="$20"
      pt="$4"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px="$4"
    >
      <Box display="flex" flexDirection="row">
        <BackArrowButton onPress={handleLeftArrowPress} />
        <Text color={Colors.Text100} fontSize="$xl" px="$8" py="$4" fontWeight="$medium">
          {title}
        </Text>
      </Box>
      <Box flexDirection="row">
        {secondaryActionIcon && (
          <Pressable onPress={onSecondaryAction} p="$4">
            <FontAwesomeIcon icon={secondaryActionIcon} size={22} color={Colors.Text100} />
          </Pressable>
        )}
        {options && (
          <>
            <Pressable onPress={onPrimaryAction} p="$4">
              <FontAwesomeIcon icon="ellipsis-vertical" size={22} color={Colors.Text100} />
            </Pressable>
            <OptionsMenu
              isOpen={isOptionsMenuOpen}
              onClose={handleOptionsMenuClose}
              options={options}
            />
          </>
        )}
      </Box>
      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        heading={confirmationHeading}
        text={confirmationText}
        confirmButtonText="Yes"
        cancelButtonText="Cancel"
      />
    </Box>
  );
};

export default Header;
