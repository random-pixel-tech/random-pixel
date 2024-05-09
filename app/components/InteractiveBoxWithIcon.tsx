import React from 'react';
import { Pressable, Box, Center, Text } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Colors } from '../services/utils/colors';

interface InteractiveBoxWithIconProps {
  onPress?: () => void;
  title: string;
  icon: IconProp;
  disabled?: boolean; // Add disabled prop
}

const InteractiveBoxWithIcon: React.FC<InteractiveBoxWithIconProps> = ({
  onPress,
  title,
  icon,
  disabled,
}) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Box
        bg='$pixSecondaryLight50'
        aspectRatio={1}
        rounded="$lg"
        p="$4"
        m="$4"
        $sm-w="$32"
        $md-w="$40"
      >
        <Center height="100%" justifyContent="space-evenly">
          <FontAwesomeIcon icon={icon} size={40} color={disabled ? Colors.TextLight100 : Colors.Text100} />
          <Text color={disabled ? Colors.TextLight100 : Colors.Text100}>{title}</Text>
        </Center>
      </Box>
    </Pressable>
  );
};

export default InteractiveBoxWithIcon;
