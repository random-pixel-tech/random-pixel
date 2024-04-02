import React from 'react';
import { Box, Text, Pressable } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../services/utils/colors';

interface HeaderProps {
  title: string;
  onSavePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onSavePress }) => {
  const navigation = useNavigation();

  return (
    <Box
      bg="$pixWhite"
      w="$full"
      h="$16"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px="$4"
    >
      <Box display="flex" flexDirection="row">
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon="arrow-left" size={20} color={Colors.Text100} />
        </Pressable>
        <Text color="$pixHeader" fontSize="$lg" px="$8" fontWeight="$medium">
          {title}
        </Text>
      </Box>
      {onSavePress && (
        <Pressable onPress={onSavePress}>
          <FontAwesomeIcon icon="check" size={20} color={Colors.Text100} />
        </Pressable>
      )}
    </Box>
  );
};

export default Header;