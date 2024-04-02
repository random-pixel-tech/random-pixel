import React from 'react';
import { Box } from '@gluestack-ui/themed';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import SuccessAlert from '../../components/SuccessAlert';
import useAttendanceLogic from '../../services/utils/useAttendanceLogic';
import Header from '../../components/Header';
import AttendanceList from './AttendanceList';

const CaptureAttendance = () => {
  const {
    showAlertDialog,
    setShowAlertDialog,
    alertMessage,
    studentAttendanceData,
    isPopoverOpen,
    handleOpenPopover,
    handleClosePopover,
    selectedCheckbox,
    handleCheckboxChange,
    showConfirmationDialog,
    setShowConfirmationDialog,
    handleSaveAttendance,
    saveAttendance,
    handleLeaveClick,
    unmarkedStudentCount,
  } = useAttendanceLogic();

  return (
    <Box bg="$pixWhite" w="$full" h="$full">
      <Header title="Attendance" onSavePress={handleSaveAttendance} />
      <Box bg="$pixSecondary" w="$full" h="$8" />

      <AttendanceList
        studentAttendanceData={studentAttendanceData}
        isPopoverOpen={isPopoverOpen}
        handleOpenPopover={handleOpenPopover}
        handleClosePopover={handleClosePopover}
        selectedCheckbox={selectedCheckbox}
        handleCheckboxChange={handleCheckboxChange}
        handleLeaveClick={handleLeaveClick} 
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