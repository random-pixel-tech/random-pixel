import React from 'react';
import { Box, Pressable, Text } from '@gluestack-ui/themed';

interface PeriodChipProps {
  label: string;
}

const PeriodChip: React.FC<PeriodChipProps> = ({ label }) => {
  return (
    <Box>
      <Box
        bg="$pixAccentLight50"
        py="$1"
        px="$2"
        rounded="$md"
        borderColor="$pixPrimary"
        alignContent='center'
      >
        <Text color="$pixPrimaryDark100" fontSize="$xs">
          {label}
        </Text>
      </Box>
      </Box>
  );
};

export default PeriodChip;