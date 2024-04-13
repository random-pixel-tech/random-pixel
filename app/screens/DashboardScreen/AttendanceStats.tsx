import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import StatsHeader from '../../components/StatsHeader';
import AttendanceView from '../../components/AttendanceView';
const AttendanceStats = () => (
    <Box bg="$pixWhite" w="$full" h="$full">
      <StatsHeader title="Attendance"/>
      <AttendanceView />
    </Box>

);

export default AttendanceStats;
