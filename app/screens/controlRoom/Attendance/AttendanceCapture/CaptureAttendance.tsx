import React, { useContext, useMemo, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import AttendanceList from "./components/AttendanceList";
import AttendanceCaptureHeader from "./components/AttendanceHeader";
import { CaptureAttendanceContext } from "../../../../services/utils/api/useAttendanceLogic";
import {
  RouteNames,
  RootStackParamList,
} from "../../../../services/utils/RouteNames";
import { AttendanceSession } from "../../../../services/utils/enums";
import {
  Header,
  HolidayMessage,
  ConfirmationDialog,
  SuccessAlert,
} from "../../../../components";
import { StyleSheet, View } from "react-native";

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

  return (
    <View style={styles.container}>
      <Header
        title="Attendance"
        secondaryActionIcon="check"
        showConfirmation={showLeaveConfirmation}
        setShowConfirmation={setShowLeaveConfirmation}
        confirmationHeading="Are you sure you want to leave?"
        confirmationText="You will lose the captured attendance if you leave without saving."
        onSecondaryAction={handleSaveAttendance}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CaptureAttendance;
