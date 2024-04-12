import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface AttendanceListHeaderProps {
  FirstColumnText?: string;
  SecondColumnText?: string;
  ThirdColumnText?: string;
  FourthColumnText?: string;
  icon?: IconProp;
}

const AttendanceListHeader: React.FC<AttendanceListHeaderProps> = ({
  FirstColumnText,
  SecondColumnText,
  ThirdColumnText,
  FourthColumnText,
  icon
}) => {
  return (
    <Box display="flex" py="$2" flexDirection="row" bg="$pixSecondaryLight50">
      <Box w="$1/6" px="$4" justifyContent="center">
        <Text bold={true} color="$pixTextDark100" size="lg">
          {FirstColumnText}
        </Text>
      </Box>
      <Box w="$2/5" px="$4" justifyContent="center">
        <Text bold={true} color="$pixTextDark100" size="lg">
          {SecondColumnText}
        </Text>
      </Box>
      <Box w="$1/6" px="$4" justifyContent="center">
        <Text bold={true} color="$pixTextDark100" size="lg">
          {ThirdColumnText}
        </Text>
      </Box>
      <Box w="$1/6" px="$4" justifyContent="center">
        <Text bold={true} color="$pixTextDark100" size="lg">
          {FourthColumnText}
        </Text>
      </Box>
      {icon && (
        <Box justifyContent="center" w="$1/6">
          <FontAwesomeIcon icon={icon} size={24} />
        </Box>
      )}
    </Box>
  );
};

export default AttendanceListHeader;