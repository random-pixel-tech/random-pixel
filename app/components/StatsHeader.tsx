import React from 'react';
import { Box, Text, Pressable } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../services/utils/colors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Option {
  label: string;
  icon: IconProp;
  onPress: () => void;
}

interface StatsHeaderProps {
  title: string;
  icon?: IconProp;
  options?: Option[];
  onIconPress?: () => void;
  isPopoverOpen?: boolean;
  onPopoverOpen?: () => void;
  onPopoverClose?: () => void;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({
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
    <Box
      bg="$pixSecondaryLight50"
      w="$full"
      h="$20"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px="$4"
      borderBottomWidth={2}
      borderBottomColor={Colors.SecondaryLight100}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon="arrow-left" size={20} color={Colors.Text100} />
      </Pressable>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Text color={Colors.Text100} fontSize="$md" fontWeight="$medium" mb="$4">
          {title}
        </Text>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Pressable>
            <FontAwesomeIcon icon="arrow-left" size={16} color={Colors.Primary} />
          </Pressable>
          <Text px="$2">29, APR - 2024</Text>
          <Pressable>
            <FontAwesomeIcon icon="arrow-right" size={16} color={Colors.Primary} />
          </Pressable>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Pressable onPress={onIconPress}>
          <FontAwesomeIcon icon="calendar" size={20} color={Colors.Primary} />
        </Pressable>
        <Text color={Colors.Text100} mt='$1'>Daily</Text>
      </Box>
    </Box>
  );
};

export default StatsHeader;