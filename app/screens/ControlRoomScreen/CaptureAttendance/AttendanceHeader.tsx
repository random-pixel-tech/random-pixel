import React from 'react';
import { Box, Heading, Text } from '@gluestack-ui/themed';

interface AttendanceHeaderProps {
  className: string;
  today: string;
  totalStudents: number;
  markedStudents: number;
}

const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({ className, today, totalStudents, markedStudents }) => {
  return (
    <Box bg="$pixSecondary" w="$full" h="$16" alignContent="center" p="$1" justifyContent="space-between" flexDirection="row">
      <Box>
        <Heading fontSize="$lg">{className}</Heading>
        <Text fontSize="$md">{today}</Text>
      </Box>
      <Box>
        <Heading fontSize="$lg" alignSelf="flex-end">
          {markedStudents}/{totalStudents}
        </Heading>
        <Text fontSize="$md">Summary</Text>
      </Box>
    </Box>
  );
};

export default AttendanceHeader;