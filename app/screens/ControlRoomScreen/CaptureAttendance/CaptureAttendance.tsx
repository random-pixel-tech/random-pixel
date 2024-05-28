import React, { useContext, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box } from "@gluestack-ui/themed";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import AttendanceList from "./AttendanceList";
import AttendanceHeader from "./AttendanceHeader";
import { CaptureAttendanceContext } from "../../../services/utils/api/useAttendanceLogic";
import { RouteNames, RootStackParamList } from "../../../services/utils/RouteNames";
import { AttendanceSession } from "../../../services/utils/enums";
import { Header, HolidayMessage, ConfirmationDialog, SuccessAlert } from "../../../components";

const CaptureAttendance = () => {
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

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const attendanceCaptureMenuOptions = useMemo(
    () =>
      getAttendanceCaptureMenuOptions(session, handleSessionToggle, toggleAttendanceCaptureMenu),
    [session, handleSessionToggle]
  );

  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);

  const handleBackArrowPress = () => {
    if (checkAttendanceChanges()) {
      setShowLeaveConfirmation(true);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Box bg="$pixWhite" w="$full" h="$full">
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
      <AttendanceHeader />
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
          navigation.navigate(RouteNames.AttendanceSummary, { session });
        }}
        message={alertMessage}
        heading="Attendance Complete!"
        confirmButtonText="Ok"
        cancelButtonText="Cancel"
      />
    </Box>
  );
};

const getAttendanceCaptureMenuOptions = (
  session,
  handleSessionToggle,
  toggleAttendanceCaptureMenu
) => [
  {
    label:
      session === AttendanceSession.Morning ? "Switch to Session Two" : "Switch to Session One",
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

export default CaptureAttendance;
