import React from 'react';
import { Box, Text, Pressable } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../services/utils/colors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import OptionsMenu from './OptionsMenu';

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
}

const Header: React.FC<HeaderProps> = ({
  title,
  icon,
  options,
  onIconPress,
  isPopoverOpen,
  onPopoverOpen,
  onPopoverClose,
}) => {
  const navigation = useNavigation();

  return (
    <Box bg="$pixWhite" w="$full" h="$16" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" px="$4">
      <Box display="flex" flexDirection="row">
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon="arrow-left" size={20} color={Colors.Text100} />
        </Pressable>
        <Text color={Colors.Text100} fontSize="$lg" px="$8" fontWeight="$medium">
          {title}
        </Text>
      </Box>
      {icon && (
        <Pressable onPress={onIconPress}>
          <FontAwesomeIcon icon={icon} size={20} color={Colors.Text100} />
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
    </Box>
  );
};

export default Header;