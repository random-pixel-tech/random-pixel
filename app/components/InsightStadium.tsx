import React from 'react';
import { Box, Center, Divider, Text } from '@gluestack-ui/themed';
import { Colors } from '../services/utils/colors';

interface InsightStadiumProps {
  labelType: 'warn' | 'info' | 'error' | 'success';
  labelText: string;
  timeDuration: string;
  benchmark: string;
}

const InsightStadium: React.FC<InsightStadiumProps> = ({
  labelType,
  labelText,
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
      w="$6/6"
      hardShadow="1"
    >
      <Center flexDirection="column" justifyContent="space-between" height="100%" alignContent='space-between'>
        <Text color={getLabelColor()} alignSelf='flex-start' fontSize="$xs">
          {labelText}
        </Text>
        <Divider bg={getLabelColor()} h="$0.25" mb="$2" mt="$2"/>
        <Text fontSize="$xs" alignSelf='flex-start' >
          {benchmark} in {timeDuration}
        </Text>
      </Center>
    </Box>
  );
};

export default InsightStadium;