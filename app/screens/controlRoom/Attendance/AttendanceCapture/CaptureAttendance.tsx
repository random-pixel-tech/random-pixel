import React, { useContext, useMemo, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import AttendanceList from "./components/AttendanceList";
import AttendanceCaptureHeader from "./components/AttendanceHeader";
import { RouteNames } from "../../../../services/utils/RouteNames";
import { AttendanceSession } from "../../../../services/utils/enums";
import {
  Header,
  ConfirmationDialog,
  SuccessAlert,
} from "../../../../components";
import { StyleSheet, View } from "react-native";
import HolidayMessage from "../AttendanceStats/components/HolidayMessage";
import { CaptureAttendanceContext } from "../../../../providers/CaptureAttendanceProvider";

const getAttendanceCaptureMenuOptions = (
  session,
  handleSessionToggle,
  toggleAttendanceCaptureMenu
) => [
  {
    label:
      session === AttendanceSession.Morning
        ? "Switch to Session Two"
        : "Switch to Session One",
    icon: "toggle-on" as IconProp,
    onPress: () => {
      handleSessionToggle();
      toggleAttendanceCaptureMenu();
    },
  },
  {
    label: "Generate Attendance Report",
    icon: "file-export" as IconProp,
    onPress: () => {
      toggleAttendanceCaptureMenu();
    },
  },
];
const CaptureAttendance = ({ navigation }) => {
  const {
    handleSaveAttendance,
    saveAttendance,
    toggleAttendanceCaptureMenu,
    unmarkedStudentCount,
    showConfirmationDialog,
    setShowConfirmationDialog,
    setShowAlertDialog,
    showAlertDialog,
    alertMessage,
    session,
    handleSessionToggle,
    isHoliday,
    checkAttendanceChanges,
    isOptionsMenuOpen,
  } = useContext(CaptureAttendanceContext) || {};

  const attendanceCaptureMenuOptions = useMemo(
    () =>
      getAttendanceCaptureMenuOptions(
        session,
        handleSessionToggle,
        toggleAttendanceCaptureMenu
      ),
    [session, handleSessionToggle]
  );

  const [showLeaveConfirmation, setShowLeaveConfirmation] =
    useState(false);

  const handleBackArrowPress = () => {
    if (checkAttendanceChanges()) {
      setShowLeaveConfirmation(true);
    } else {
      navigation.goBack();
    }
  };

  const handleConfirm = () => {
    setShowLeaveConfirmation(false);
    navigation.goBack();
  };

  const handleCancel = () => {
    setShowLeaveConfirmation(false);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Attendance"
        secondaryActionIcon="check"
        onSecondaryAction={handleSaveAttendance}
        isOptionsMenuOpen={isOptionsMenuOpen}
        options={attendanceCaptureMenuOptions}
        onPrimaryAction={toggleAttendanceCaptureMenu}
        onBackArrowPress={handleBackArrowPress}
      />
      <AttendanceCaptureHeader />
      {isHoliday === true ? <HolidayMessage /> : <AttendanceList />}
      <ConfirmationDialog
        isOpen={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
        onConfirm={async () => {
          setShowConfirmationDialog(false);
          await saveAttendance();
        }}
        heading="Are you sure you want to continue?"
        text={`You haven't marked attendance for ${unmarkedStudentCount} student(s), are you sure you want to mark attendance as complete?`}
        confirmButtonText="Yes"
        cancelButtonText="Go Back"
      />
      <SuccessAlert
        isOpen={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        onConfirm={() => {
          setShowAlertDialog(false);
          navigation.navigate(RouteNames.AttendanceSummary, {
            session,
          });
        }}
        message={alertMessage}
        heading="Attendance Complete!"
        confirmButtonText="Ok"
        cancelButtonText="Cancel"
      />
      <ConfirmationDialog
        isOpen={showLeaveConfirmation}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        heading="Are you sure you want to leave?"
        text="You will lose the captured attendance if you leave without saving."
        confirmButtonText="Yes"
        cancelButtonText="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CaptureAttendance;
