import React from 'react';
import { Box, Pressable, Text } from '@gluestack-ui/themed';

interface ChipProps {
  label: string;
  count: number;
  isSelected: boolean;
  onPress: () => void;
  isDisabled?: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, count, isSelected, onPress, isDisabled = false }) => {
  return (
    <Pressable onPress={onPress} disabled={isDisabled}>
      <Box
        bg={isDisabled ? '$pixSecondaryDisabled' : '$pixSecondary'}
        py="$2"
        px="$6"
        mr="$4"
        rounded="$full"
        borderWidth={isSelected ? 1 : 0}
        borderColor="$pixPrimary"
      >
        <Text color={isSelected ? '$pixPrimary' : '$pixText'}>
          {label}&nbsp;
          <Text fontWeight="$medium" color={isSelected ? '$pixPrimary' : '$pixText'}>
            {count}
          </Text>
        </Text>
      </Box>
    </Pressable>
  );
};

export default Chip;