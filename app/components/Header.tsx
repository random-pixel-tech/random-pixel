import React, { useState } from 'react';
import { Box, Text, Pressable } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../services/utils/colors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import OptionsMenu from './OptionsMenu';
import ConfirmationDialog from './ConfirmationDialog'; // Import ConfirmationDialog component

interface Option {
  label: string;
  icon: IconProp;
  onPress: () => void;
}

interface HeaderProps {
  title: string;
  icon?: IconProp;
  options?: Option[];
  onIconPress?: () => void;
  isPopoverOpen?: boolean;
  onPopoverOpen?: () => void;
  onPopoverClose?: () => void;
  showConfirmation?: boolean;
  confirmationHeading?: string;
  confirmationText?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  icon,
  options,
  onIconPress,
  isPopoverOpen,
  onPopoverOpen,
  onPopoverClose,
  showConfirmation = false,
  confirmationHeading = "",
  confirmationText = "",
}) => {
  const navigation = useNavigation();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleLeftArrowPress = () => {
    if (showConfirmation) {
      setConfirmVisible(true);
    } else {
      navigation.goBack();
    }
  };

  const handleConfirm = () => {
    setConfirmVisible(false);
    navigation.goBack();
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  return (
    <Box bg="$pixWhite" w="$full" h="$20" pt="$4" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" px="$4">
      <Box display="flex" flexDirection="row">
        <Pressable onPress={handleLeftArrowPress} p="$4">
          <FontAwesomeIcon icon="arrow-left" size={18} color={Colors.Text100} />
        </Pressable>
        <Text color={Colors.Text100} fontSize="$lg" px="$8" py="$4" fontWeight="$medium">
          {title}
        </Text>
      </Box>
      {icon && (
        <Pressable onPress={onIconPress} p="$4">
          <FontAwesomeIcon icon={icon} size={18} color={Colors.Text100} />
        </Pressable>
      )}
      {options && (
        <OptionsMenu
          isOpen={isPopoverOpen}
          onClose={onPopoverClose}
          onOpen={onPopoverOpen}
          options={options}
        />
      )}
      <ConfirmationDialog
        isOpen={confirmVisible}
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
