import React, { useContext, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import InteractiveBoxWithIcon from "../../components/InteractiveBoxWithIcon";
import { CaptureAttendanceContext } from "../../services/utils/api/useAttendanceLogic";
import AttendanceActions from "./Attendance/AttendanceActions";

const ControlRoom = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const initialFocusRef = useRef(null);
  const { studentAttendanceData } = useContext(
    CaptureAttendanceContext
  );

  const handleFirstBoxPress = () => {
    setShowActionSheet(true);
  };

  const handleCloseActionSheet = () => {
    setShowActionSheet(false);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.rowContainer}>
        <InteractiveBoxWithIcon
          onPress={handleFirstBoxPress}
          title="Attendance"
          icon="user-check"
        />
        <InteractiveBoxWithIcon
          title="Notices"
          icon="bullhorn"
          disabled={true}
        />
      </View>
      <View style={styles.rowContainer}>
        <InteractiveBoxWithIcon
          title="Classes"
          icon="person-chalkboard"
          disabled={true}
        />
        <InteractiveBoxWithIcon
          title="Calendar"
          icon="calendar"
          disabled={true}
        />
      </View>
      <AttendanceActions
        isOpen={showActionSheet}
        onClose={handleCloseActionSheet}
        initialFocusRef={initialFocusRef}
        studentAttendanceData={studentAttendanceData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    columnGap: 10,
  },

  cardContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
    gap: 10,
  },
});

export default ControlRoom;
