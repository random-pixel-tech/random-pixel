// AttendanceSummaryListItem.tsx
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  Student,
  AttendanceRecord,
} from "../../../../../services/utils/api/useStudentAttendance";
import { AttendanceSession } from "../../../../../services/utils/enums";
import AttendanceOptions from "../components/AttendanceOptions";
import { StyleSheet, Text, View } from "react-native";

interface AttendanceSummaryListItemProps {
  student: Student;
  attendanceRecord: AttendanceRecord | null;
  isSummaryPopoverOpen: boolean;
  onSummaryPopoverOpen: () => void;
  onSummaryPopoverClose: () => void;
  session: AttendanceSession;
}

const AttendanceSummaryListItem: React.FC<
  AttendanceSummaryListItemProps
> = ({
  student,
  isSummaryPopoverOpen,
  onSummaryPopoverOpen,
  onSummaryPopoverClose,
}) => {
  const options = [
    {
      label: "View student profile",
      icon: "address-card" as IconProp,
      onPress: () => {
        // Handle view student profile action
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.rollNumberContainer}>
        <Text style={styles.rollNumberText}>
          {student.roll_number || "-"}
        </Text>
      </View>
      <View style={styles.studentNameContainer}>
        <Text style={styles.studentNameText}>
          {student.student_name}
        </Text>
      </View>
      <View style={styles.attendanceContainer}>
        <AttendanceOptions
          isOpen={isSummaryPopoverOpen}
          onClose={onSummaryPopoverClose}
          onOpen={onSummaryPopoverOpen}
          student={{
            scholar_id: student.scholar_id,
            student_name: student.student_name,
            roll_number: student.roll_number,
          }}
          options={options}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 36,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  rollNumberContainer: {
    width: 48,
  },
  rollNumberText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  studentNameContainer: {
    width: 172,
  },
  studentNameText: {
    fontSize: 16,
  },
  attendanceContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  checkBoxContainer: {
    padding: 12,
  },
});

export default AttendanceSummaryListItem;
