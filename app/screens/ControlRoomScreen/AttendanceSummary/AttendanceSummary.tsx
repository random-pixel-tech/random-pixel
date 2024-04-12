import React from 'react';
import { Box, ScrollView } from '@gluestack-ui/themed';
import useAttendanceLogic from '../../../services/utils/api/useAttendanceLogic';
import Header from '../../../components/Header';
import AttendanceHeader from '../CaptureAttendance/AttendanceHeader';
import SummaryList from './AttendanceSummaryList';
import FilterBar from '../../../components/FilterBar';
import { AttendanceStatusOrNull, filterOptions } from '../../../services/utils/constants';
import { useNavigation } from '@react-navigation/native';
import { RouteNames, RootStackParamList } from '../../../services/utils/RouteNames';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const AttendanceSummary = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    className,
    section,
    today,
    totalStudents,
    markedStudents,
    selectedStatus,
    handleStatusClick,
    getFilteredStudents,
    presentCount,
    absentCount,
    onLeaveCount,
    isPopoverOpen,
    handlePopoverOpen,
    handlePopoverClose,
    isOptionsMenuOpen,
    handleOptionsMenuOpen,
    handleOptionsMenuClose,
    handleIconPress,
  } = useAttendanceLogic();

  return (
    <Box bg="$pixWhite" w="$full" h="$full">
      <Header
        title="Attendance Summary"
        icon="ellipsis-vertical"
        options={[
          { label: 'Share report', icon: 'share', onPress: () => console.log('Option 1 pressed') },
          { label: 'Export report', icon: 'file-export', onPress: () => console.log('Option 1 pressed') },
          { label: 'Edit attendance', icon: 'pen-to-square', onPress: () => {
            navigation.navigate(RouteNames.CaptureAttendance);
            handleOptionsMenuClose();
          } },

        ]}
        isPopoverOpen={isOptionsMenuOpen}
        onPopoverOpen={handleOptionsMenuOpen}
        onPopoverClose={handleOptionsMenuClose}
        onIconPress={handleIconPress}
      />
      <AttendanceHeader
        className={className}
        section={section}
        today={today}
        summaryValues={{ markedStudents, totalStudents }}
      />
      <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterBar<AttendanceStatusOrNull>
            selectedValue={selectedStatus}
            onFilterSelection={handleStatusClick}
            filterOptions={filterOptions(totalStudents, presentCount, absentCount, onLeaveCount)}
          />
        </ScrollView>
      </Box>
      <SummaryList
        filteredStudents={getFilteredStudents()}
        isPopoverOpen={isPopoverOpen}
        handlePopoverOpen={handlePopoverOpen}
        handlePopoverClose={handlePopoverClose}
      />
    </Box>
  );
};

export default AttendanceSummary;