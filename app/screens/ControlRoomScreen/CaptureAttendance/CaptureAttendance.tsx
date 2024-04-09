import React from 'react';
import { Box } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import SuccessAlert from '../../../components/SuccessAlert';
import useAttendanceLogic from '../../../services/utils/api/useAttendanceLogic';
import Header from '../../../components/Header';
import AttendanceList from './AttendanceList';
import AttendanceHeader from './AttendanceHeader';
import { RouteNames, RootStackParamList } from '../../../services/utils/RouteNames';

const CaptureAttendance = () => {
  const {
    showAlertDialog,
    setShowAlertDialog,
    alertMessage,
    studentAttendanceData,
    isPopoverOpen,
    handlePopoverOpen,
    handlePopoverClose,
    attendanceStatus,
    handleAttendanceStatusChange,
    showConfirmationDialog,
    setShowConfirmationDialog,
    handleSaveAttendance,
    saveAttendance,
    handleLeaveClick,
    unmarkedStudentCount,
    className,
    today,
    totalStudents,
    markedStudents,
  } = useAttendanceLogic();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Box bg="$pixWhite" w="$full" h="$full">
      <Header title="Attendance" icon="check" onIconPress={handleSaveAttendance} />
      <AttendanceHeader className={className} today={today} summaryValues={{ markedStudents, totalStudents }}
      />
      <AttendanceList
        studentAttendanceData={studentAttendanceData}
        isPopoverOpen={isPopoverOpen}
        onPopoverOpen={handlePopoverOpen}
        onPopoverClose={handlePopoverClose}
        attendanceStatus={attendanceStatus}
        onAttendanceStatusChange={handleAttendanceStatusChange}
        onLeaveClick={handleLeaveClick}
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
          navigation.navigate(RouteNames.AttendanceSummary);
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