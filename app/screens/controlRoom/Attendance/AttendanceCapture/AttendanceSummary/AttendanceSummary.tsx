// AttendanceSummary.tsx
import React, { useContext } from "react";
import { Box, ScrollView } from "@gluestack-ui/themed";
import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  RootStackParamList,
  RouteNames,
} from "../../../../../services/utils/RouteNames";
import { CaptureAttendanceContext } from "../../../../../services/utils/api/useAttendanceLogic";
import { AttendanceSession } from "../../../../../services/utils/enums";


type AttendanceSummaryRouteProp = RouteProp<
  RootStackParamList,
  RouteNames.AttendanceSummary
>;

const AttendanceSummary = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<AttendanceSummaryRouteProp>();
  const initialSession =
    route.params?.session || AttendanceSession.Morning;
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
    session,
    handleSessionToggle,
    isHoliday,
  } = useContext(CaptureAttendanceContext) || {};

  const options = [
    {
      label:
        session === AttendanceSession.Morning
          ? "Switch to Session Two"
          : "Switch to Session One",
      icon: "toggle-on" as IconProp,
      onPress: () => {
        handleSessionToggle();
        handleOptionsMenuClose();
      },
    },
    {
      label: "Share report",
      icon: "share" as IconProp,
      onPress: () => console.log("Option 1 pressed"),
    },
    {
      label: "Export report",
      icon: "file-export" as IconProp,
      onPress: () => console.log("Option 2 pressed"),
    },
    {
      label: "Edit attendance",
      icon: "pen-to-square" as IconProp,
      onPress: () => {
        navigation.navigate(RouteNames.CaptureAttendance);
        handleOptionsMenuClose();
      },
    },
  ];

  return (
    <Box bg="$pixWhite" w="$full" h="$full">
      <Header
        title="Attendance Summary"
        options={options}
        isOptionsMenuOpen={isOptionsMenuOpen}
        handleOptionsMenuOpen={handleOptionsMenuOpen}
        handleOptionsMenuClose={handleOptionsMenuClose}
        handleIconPress={handleIconPress}
      />
      <AttendanceCaptureHeader
        className={className}
        section={section}
        today={today}
        summaryValues={{ markedStudents, totalStudents }}
        session={session}
        isHoliday={isHoliday}
      />
      <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterBar<AttendanceStatusOrNull>
            selectedValue={selectedStatus}
            onFilterSelection={handleStatusClick}
            filterOptions={filterOptions(
              totalStudents,
              presentCount,
              absentCount,
              onLeaveCount
            )}
          />
        </ScrollView>
      </Box>
      <SummaryList
        filteredStudents={getFilteredStudents()}
        isPopoverOpen={isPopoverOpen}
        handlePopoverOpen={handlePopoverOpen}
        handlePopoverClose={handlePopoverClose}
        session={session}
      />
    </Box>
  );
};

export default AttendanceSummary;
