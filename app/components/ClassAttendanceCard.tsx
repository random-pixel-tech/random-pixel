import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';

const toOrdinal = (n: number): string => {
  const suffixes = ['ᵗʰ', 'ˢᵗ', 'ⁿᵈ', 'ʳᵈ'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

interface ClassAttendanceCardProps {
  classData: {
    classId: string;
    className: string;
    section: string;
    totalStudents: number;
    presentStudents: number;
    presentPercentage: number;
  };
}

const ClassAttendanceCard: React.FC<ClassAttendanceCardProps> = ({ classData }) => {
  const { className, totalStudents, presentStudents, presentPercentage, section } = classData;
  const classNameOrdinal = toOrdinal(parseInt(className));

  return (
    <Box
      bg="#F8F8FF"
      p="$4"
      borderRadius="$md"
      mb="$4"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      borderColor="$pixPrimaryLight50"
      borderWidth={1}
    >
      <Box display="flex" flexDirection="column" w="$full">
        <Box display="flex" flexDirection="row" alignContent="center" justifyContent="space-between" mb="$4">
          <Box display="flex" flexDirection="row" alignContent="center">
            <Box display="flex" flexDirection="row" alignContent="center" mr="$2">
              <Text fontSize="$md" color="$pixSecondary2" pr="$1">
                Class:
              </Text>
              <Text fontSize="$sm" color="$pixPrimaryDark50" pr="$1">
                {classNameOrdinal}
              </Text>
            </Box>
            <Box display="flex" flexDirection="row" alignContent="center">
              <Text fontSize="$md" color="$pixSecondary2" pr="$1">
                Section:
              </Text>
              <Text fontSize="$sm" color="$pixPrimaryDark50">
                {section}
              </Text>
            </Box>
          </Box>
          <Box bg="#DFD6F8" px="$2" py="$0.5" rounded="$md" alignSelf="flex-end">
            <Text fontSize="$sm" color="$pixPrimaryDark50">
              {presentPercentage.toFixed(0)}%
            </Text>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" alignContent="center" justifyContent="space-between">
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Text fontSize="$md" color="$pixText" pr="$1">
              {totalStudents}
            </Text>
            <Text fontSize="$sm" color="$pixSecondary2">
              Students
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Text fontSize="$md" color="$pixText" pr="$1">
              {presentStudents}/{totalStudents}
            </Text>
            <Text fontSize="$sm" color="$pixSecondary2">
              Attendance
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Text fontSize="$md" color="$pixPrimaryDark50" pr="$1">
              {presentPercentage.toFixed(0)}%
            </Text>
            <Text fontSize="$sm" color="$pixSecondary2">
              Percentage
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClassAttendanceCard;