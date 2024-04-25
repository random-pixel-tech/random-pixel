import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { AllStudentAttendanceData } from '../services/utils/api/useStudentAttendance';
import { SelectedDuration } from '../services/utils/enums';

interface StudentAttendanceDataWithPercentage extends AllStudentAttendanceData {
  attendancePercentage: number;
  totalAttendance: number;
  presentAttendance: number;
}

interface AttendanceCardProps {
  studentAttendanceData: StudentAttendanceDataWithPercentage;
  className: string;
  section: string;
  selectedDuration: SelectedDuration;
  totalAttendance: number;
  presentAttendance: number;
}

const toOrdinal = (n: number): string => {
  const suffixes = ['ᵗʰ', 'ˢᵗ', 'ⁿᵈ', 'ʳᵈ'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  studentAttendanceData,
  className,
  section,
  selectedDuration,
  totalAttendance,
  presentAttendance,
}) => {
  const { student } = studentAttendanceData;
  const { name, rollNumber } = student;

  const percentage = totalAttendance === 0 ? 0 : (presentAttendance / totalAttendance) * 100;

  const classNameOrdinal = toOrdinal(parseInt(className));

  const renderAttendanceBox = () => {
    if (selectedDuration === SelectedDuration.Daily) {
      return (
        <Box alignContent="center" display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row" alignSelf="center">
              <Text fontSize="$md" color="$pixSecondary2">S-1</Text>
              <Text fontSize="$md" color="$pixText100" mr="$2">: A</Text>
              <Text fontSize="$md" color="$pixSecondary2">S-2</Text>
              <Text fontSize="$md" color="$pixText100">: P</Text>
            </Box>
            <Text fontSize="$sm" color="$pixSecondary2" alignSelf="center">Attendance</Text>
          </Box>
        </Box>
      );
    } else {
      return (
        <Box alignContent="center" display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column" mr="$2">
            <Text fontSize="$md" color="$pixText100" alignSelf="center">
              {presentAttendance}/{totalAttendance}
            </Text>
            <Text fontSize="$sm" color="$pixSecondary2">Attendance</Text>
          </Box>
          <Box display="flex" flexDirection="column">
            <Text fontSize="$md" color="$pixText100" alignSelf="center">
              {percentage.toFixed(0)}%
            </Text>
            <Text fontSize="$sm" color="$pixSecondary2">Percentage</Text>
          </Box>
        </Box>
      );
    }
  };

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
      <Box display="flex" flexDirection="column">
        <Text fontSize="$lg" fontWeight="$semibold" mb="$2" color="$pixPrimaryDark50">
          {name}
        </Text>
        <Box display="flex" flexDirection="row" alignContent="center" mb="$2">
          <Text fontSize="$sm" color="$pixSecondary2" pr="$1">
            Roll No:
          </Text>
          <Text fontSize="$sm" color="$pixPrimaryDark50">
            {rollNumber}
          </Text>
        </Box>
        <Box display="flex" flexDirection="row" alignContent="center">
          <Box display="flex" flexDirection="row" alignContent="center">
            <Text fontSize="$sm" color="$pixSecondary2" pr="$1">
              Class:
            </Text>
            <Text fontSize="$sm" color="$pixPrimaryDark50" pr="$1">
              {classNameOrdinal}
            </Text>
          </Box>
          <Box display="flex" flexDirection="row" alignContent="center">
            <Text fontSize="$sm" color="$pixSecondary2" pr="$1">
              Section:
            </Text>
            <Text fontSize="$sm" color="$pixPrimaryDark50">
              {section}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Box bg="#DFD6F8" px="$2" py="$0.5" rounded="$md" alignSelf="flex-end">
          <Text fontSize="$sm" color="$pixPrimaryDark50">
            {percentage.toFixed(0)}%
          </Text>
        </Box>

        {renderAttendanceBox()}
      </Box>
    </Box>
  );
};

export default AttendanceCard;