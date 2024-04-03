import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const AttendanceListHeader: React.FC = () => {
  return (
    <Box display="flex" py="$2" flexDirection="row" bg="$pixSecondaryLight50">
      <Box w="$1/6" px="$4" justifyContent="center">
        <Text bold={true} color="$pixTextDark100" size='lg' >
          Roll No.
        </Text>
      </Box>
      <Box w="$2/5" px="$4" justifyContent="center">
        <Text bold={true} color="$pixTextDark100" size='lg'>
          Name
        </Text>
      </Box>
      <Box w="$1/6" px="$4" justifyContent="center">
        <Text bold={true} color="$pixTextDark100" size='lg'>
          P
        </Text>
      </Box>
      <Box w="$1/6" px="$4" justifyContent="center">
        <Text bold={true} color="$pixTextDark100" size='lg'>
          A
        </Text>
      </Box>
      <Box justifyContent="center" w="$1/6">
        <FontAwesomeIcon icon="ellipsis-vertical" size={24} />
      </Box>
    </Box>
  );
};

export default AttendanceListHeader;