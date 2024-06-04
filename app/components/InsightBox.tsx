import React from 'react';
import { Box, Center, Text } from '@gluestack-ui/themed';
import { Colors } from '../services/utils/colors';

interface InsightBoxProps {
  state: string;
  count: number;
  countLabel: string;
  percentageText: string;
  isSuccess?: boolean;
}

const InsightBox: React.FC<InsightBoxProps> = ({
  state,
  count,
  countLabel,
  percentageText,
  isSuccess = false,
}) => {
  return (
    <Box 
    bg="$pixWhite"
    rounded="$lg"
    p="$4"
    m="$4"
    $sm-w="$32"
    $md-w="$40">
      <Center flexDirection="column" justifyContent="space-between" height="100%" alignContent='space-between'>
        <Text>
          {state}
        </Text>
        <Box pt="$4" pb="$4" justifyContent='center'>
        <Text fontSize="$4xl" textAlign='center'>
          {count}
        </Text>
        <Text fontSize="$xs">{countLabel}</Text>
        </Box>
        <Text fontSize="$xs">
          {percentageText}
        </Text>
      </Center>
    </Box>
  );
};

export default InsightBox;