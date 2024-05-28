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
  icon,
}) => {
  return (
    <Box display="flex" px="$4" py="$2" gap={"$2"} flexDirection="row" bg="$pixSecondaryLight50">
      <Box w="$8">
        <Text color="$pixTextDark100" size="lg">
          {FirstColumnText}
        </Text>
      </Box>
      <Box display="flex" flex={1}>
        <Text color="$pixTextDark100" size="lg">
          {SecondColumnText}
        </Text>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flex={1}
        alignItems="center"
        flexDirection="row"
      >
        <Box display="flex" alignItems="center" flex={1}>
          <Text size="lg" py="$1" px="$3">
            {ThirdColumnText}
          </Text>
        </Box>
        <Box display="flex" alignItems="center" flex={1}>
          <Text color="$pixTextDark100" size="lg">
            {FourthColumnText}
          </Text>
        </Box>
        <Box backgroundColor="black" display="flex" alignItems="center" flex={1}>
          {icon && <FontAwesomeIcon icon={icon} size={24} />}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(AttendanceListHeader);