import React, { useContext } from "react";
import { Box } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import SuccessAlert from "../../../components/SuccessAlert";
import { CaptureAttendanceContext } from "../../../services/utils/api/useAttendanceLogic";
import Header from "../../../components/Header";
import AttendanceList from "./AttendanceList";
import AttendanceHeader from "./AttendanceHeader";
import { RouteNames, RootStackParamList } from "../../../services/utils/RouteNames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { AttendanceSession } from "../../../services/utils/enums";

const CaptureAttendance = () => {
  const {
    attendanceStatus,
    handleAttendanceStatusChange,
    handleSaveAttendance,
    saveAttendance,
    isOptionsMenuOpen,
    handleOptionsMenuOpen,
    handleOptionsMenuClose,
    handlePopoverOpen,
    handlePopoverClose,
    handleIconPress,
    handleLeaveClick,
    totalStudents,
    markedStudents,
    studentAttendanceData,
    isPopoverOpen,
    unmarkedStudentCount,
    checkAttendanceChanges,
    showConfirmationDialog,
    setShowConfirmationDialog,
    setShowAlertDialog,
    showAlertDialog,
    alertMessage,
    session,
    handleSessionToggle,
    className,
    today,
    section,
    isHoliday,
  } = useContext(CaptureAttendanceContext) || {};

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const options = [
    {
      label:
        session === AttendanceSession.Morning ? "Switch to Session Two" : "Switch to Session One",
      icon: "toggle-on" as IconProp,
      onPress: () => {
        handleSessionToggle();
        handleOptionsMenuClose();
      },
    },
    {
      label: "Generate Attendance Report",
      icon: "file-export" as IconProp,
      onPress: () => {
        handleOptionsMenuClose();
      },
    },
  ];

  return (
    <Box bg="$pixWhite" w="$full" h="$full">
      <Header
        title="Attendance"
        icon="check"
        onIconPress={handleSaveAttendance}
        showConfirmation={true}
        confirmationHeading="Are you sure you want to leave?"
        confirmationText="You will lose the captured attendance if you leave without saving."
        options={options}
        isOptionsMenuOpen={isOptionsMenuOpen}
        handleOptionsMenuOpen={handleOptionsMenuOpen}
        handleOptionsMenuClose={handleOptionsMenuClose}
        handleIconPress={handleIconPress}
        checkChanges={checkAttendanceChanges}
      />
      <AttendanceHeader
        section={section}
        session={session}
        className={className}
        today={today}
        summaryValues={{ markedStudents, totalStudents }}
        isHoliday={isHoliday}
      />
      <AttendanceList
        studentAttendanceData={studentAttendanceData}
        isPopoverOpen={isPopoverOpen}
        onPopoverOpen={handlePopoverOpen}
        onPopoverClose={handlePopoverClose}
        attendanceStatus={attendanceStatus}
        onAttendanceStatusChange={handleAttendanceStatusChange}
        onLeaveClick={handleLeaveClick}
        isHoliday={isHoliday}
      />
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

export default CaptureAttendance;
