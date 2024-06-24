import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';

const HolidayMessage: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
      <Text fontWeight="bold">Today is a holiday!</Text>
    </Box>
  );
};

export default HolidayMessage;