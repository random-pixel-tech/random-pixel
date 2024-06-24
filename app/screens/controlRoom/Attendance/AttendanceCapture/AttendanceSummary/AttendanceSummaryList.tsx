// AttendanceSummaryList.tsx
import React from "react";
import AttendanceSummaryListItem from "./AttendanceSummaryListItem";
import {
  Student,
  AttendanceRecord,
} from "../../../../../services/utils/api/useStudentAttendance";
import { AttendanceSession } from "../../../../../services/utils/enums";
import AttendanceListHeader from "../components/AttendanceListHeader";
import { FlatList, StyleSheet, View } from "react-native";

interface AttendanceSummaryListProps {
  filteredStudents: Array<{
    student: Student;
    attendanceRecord: AttendanceRecord | null;
  }>;
  isPopoverOpen: Record<string, boolean>;
  handleSummaryPopoverOpen: (studentId: string) => void;
  handleSummaryPopoverClose: (studentId: string) => void;
  session: AttendanceSession;
}

const AttendanceSummaryList: React.FC<AttendanceSummaryListProps> = ({
  filteredStudents,
  isPopoverOpen,
  handleSummaryPopoverOpen,
  handleSummaryPopoverClose,
  session,
}) => {
  const renderItem = ({
    item,
  }: {
    item: {
      student: Student;
      attendanceRecord: AttendanceRecord | null;
    };
  }) => (
    <AttendanceSummaryListItem
      key={item.student.scholar_id}
      student={item.student}
      attendanceRecord={item.attendanceRecord}
      isSummaryPopoverOpen={
        isPopoverOpen[item.student.scholar_id] ?? false
      }
      onSummaryPopoverOpen={() =>
        handleSummaryPopoverOpen(item.student.scholar_id)
      }
      onSummaryPopoverClose={() =>
        handleSummaryPopoverClose(item.student.scholar_id)
      }
      session={session}
    />
  );

  return (
    <View style={styles.container}>
      <AttendanceListHeader
        FirstColumnText="R.N."
        SecondColumnText="Name"
      />
      <View style={styles.listContainer}>
        <FlatList
          data={filteredStudents}
          renderItem={({ item }) =>
            renderItem({
              item: item as {
                student: Student;
                attendanceRecord: AttendanceRecord | null;
              },
            })
          }
          keyExtractor={(item) =>
            (
              item as {
                student: Student;
                attendanceRecord: AttendanceRecord | null;
              }
            ).student.scholar_id
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContainer: {
    flex: 1,
  },
});

export default AttendanceSummaryList;
