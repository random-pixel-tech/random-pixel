import React, { useContext } from "react";
import { AttendanceSession } from "../../../../../services/utils/enums";
import { useDateAndTimeUtil } from "../../../../../services/utils/dateAndTimeUtils";
import { StyleSheet, Text, View } from "react-native";
import {
  SECONDARY,
  TEXT_DARK_100,
} from "../../../../../theme/color-tokens";
import { CaptureAttendanceContext } from "../../../../../providers/CaptureAttendanceProvider";

const AttendanceCaptureHeader = () => {
  const {
    className,
    section,
    session,
    isHoliday,
    markedStudents,
    totalStudents,
  } = useContext(CaptureAttendanceContext) || {};
  const { currentDay } = useDateAndTimeUtil();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>
          Class: {className} {section}
        </Text>
        <Text style={{ fontSize: 14 }}>
          {currentDay}{" "}
          {!isHoliday &&
            `| ${
              session === AttendanceSession.Morning
                ? "Session one"
                : "Session two"
            }`}
        </Text>
      </View>
      {!isHoliday && (
        <View>
          <Text style={[styles.headerText, { fontSize: 20 }]}>
            {`${markedStudents} / ${totalStudents}`}
          </Text>
          <Text style={{ fontSize: 14 }}>Summary</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: SECONDARY,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  headerText: {
    fontSize: 16,
    fontWeight: "500",
    color: TEXT_DARK_100,
  },
});

export default AttendanceCaptureHeader;
