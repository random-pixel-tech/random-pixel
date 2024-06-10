import React from 'react';
import { Box, Center, Text } from '@gluestack-ui/themed';
import { Colors } from '../services/utils/colors';

interface InsightBoxProps {
  labelType: 'warn' | 'info' | 'error' | 'success';
  labelText: string;
  count: number;
  countLabel: string;
  timeDuration: string;
  benchmark: string;
}

const InsightBox: React.FC<InsightBoxProps> = ({
  labelType,
  labelText,
  count,
  countLabel,
  timeDuration,
  benchmark,
}) => {
  const getLabelColor = () => {
    switch (labelType) {
      case 'warn':
        return Colors.Warning400;
      case 'info':
        return Colors.Info400;
      case 'error':
        return Colors.Error400;
      case 'success':
        return Colors.Success400;
      default:
        return Colors.Text100;
    }
  };

  const getLabelBgColor = () => {
    switch (labelType) {
      case 'warn':
        return Colors.Warning50;
      case 'info':
        return Colors.Info50;
      case 'error':
        return Colors.Error50;
      case 'success':
        return Colors.Success50;
      default:
        return Colors.White;
    }
  };

  return (
    <Box
      bg={getLabelBgColor()}
      rounded="$lg"
      p="$4"
      m="$4"
      $sm-w="$32"
      $md-w="$40"
      hardShadow="1"
    >
      <Center flexDirection="column" justifyContent="space-between" height="100%" alignContent='space-between'>
        <Text color={getLabelColor()} fontWeight="bold">
          {labelText}
        </Text>
        <Box pt="$4" pb="$4" justifyContent='center'>
          <Text fontSize="$4xl" textAlign='center'>
            {count}
          </Text>
          <Text fontSize="$xs">{countLabel}</Text>
        </Box>
        <Text fontSize="$xs">
          {benchmark} in {timeDuration}
        </Text>
      </Center>
    </Box>
  );
};

export default InsightBox;