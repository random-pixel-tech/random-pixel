// AttendanceSummary.tsx
import React, { useContext } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { RouteNames } from "../../../../../services/utils/RouteNames";
import { AttendanceSession } from "../../../../../services/utils/enums";
import AttendanceCaptureHeader from "../components/AttendanceHeader";
import { ScrollView, StyleSheet, View } from "react-native";
import { FilterBar, Header } from "../../../../../components";
import {
  AttendanceStatusOrNull,
  filterOptions,
} from "../../../../../services/utils/constants";
import AttendanceSummaryList from "./AttendanceSummaryList";
import { PRIMARY_WHITE } from "../../../../../theme/color-tokens";
import { CaptureAttendanceContext } from "../../../../../providers/CaptureAttendanceProvider";

const AttendanceSummary = ({ navigation }) => {
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
    isSummaryPopoverOpen,
    handleSummaryPopoverOpen,
    handleSummaryPopoverClose,
    handleOptionsMenuClose,
    session,
    handleSessionToggle,
    isHoliday,
    toggleAttendanceCaptureMenu,
    isOptionsMenuOpen,
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
    <View style={styles.container}>
      <Header
        title="Attendance Summary"
        options={options}
        isOptionsMenuOpen={isOptionsMenuOpen}
        handleOptionsMenuClose={handleOptionsMenuClose}
        onPrimaryAction={toggleAttendanceCaptureMenu}
      />
      <AttendanceCaptureHeader
        className={className}
        section={section}
        today={today}
        summaryValues={{ markedStudents, totalStudents }}
        session={session}
        isHoliday={isHoliday}
      />
      <View>
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
      </View>
      <AttendanceSummaryList
        filteredStudents={getFilteredStudents()}
        isPopoverOpen={isSummaryPopoverOpen ?? false}
        handleSummaryPopoverOpen={handleSummaryPopoverOpen}
        handleSummaryPopoverClose={handleSummaryPopoverClose}
        session={session}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_WHITE,
  },
});

export default AttendanceSummary;
