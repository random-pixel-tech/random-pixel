import React from 'react';
import { Box } from '@gluestack-ui/themed';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import SuccessAlert from '../../../components/SuccessAlert';
import useAttendanceLogic from '../../../services/utils/useAttendanceLogic';
import Header from '../../../components/Header';
import AttendanceList from './AttendanceList';
import AttendanceHeader from './AttendanceHeader';

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

  return (
    <Box bg="$pixWhite" w="$full" h="$full">
      <Header title="Attendance" onSavePress={handleSaveAttendance} />
      <AttendanceHeader className={className} today={today} totalStudents={totalStudents} markedStudents={markedStudents} />

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
        message={alertMessage}
        heading='Attendance Complete!'
        confirmButtonText="Ok"
        cancelButtonText="Cancel"
      />
    </Box>
  );
};

export default CaptureAttendance;