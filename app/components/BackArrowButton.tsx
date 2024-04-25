import React from 'react';
import { Pressable } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../services/utils/colors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface BackArrowButtonProps {
  onPress: () => void;
}

const BackArrowButton: React.FC<BackArrowButtonProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} p="$4">
      <FontAwesomeIcon icon="arrow-left" size={18} color={Colors.Text100} />
    </Pressable>
  );
};

export default BackArrowButton;
