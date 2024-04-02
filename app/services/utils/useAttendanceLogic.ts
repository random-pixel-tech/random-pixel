import { useState, useEffect } from 'react';
import useStudentAttendance, { AttendanceStatus, AttendanceSession } from '../../services/utils/api/useStudentAttendance';
import { getInitialAttendanceState, getUpdatedRecords } from './attendanceUtils';

const useAttendanceLogic = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [unmarkedStudentCount, setUnmarkedStudentCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const { studentAttendanceData, updateAttendanceRecord, setStudentAttendanceData, fetchUpdatedAttendanceData } = useStudentAttendance();
  const [isPopoverOpen, setIsPopoverOpen] = useState<Record<string, boolean>>({});
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, AttendanceStatus | null>>({});
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    const initialAttendanceState = getInitialAttendanceState(studentAttendanceData);
    setAttendanceStatus(initialAttendanceState);
  }, [studentAttendanceData]);

  const handlePopoverOpen = (studentId: string) => {
    setIsPopoverOpen((prevState) => ({ ...prevState, [studentId]: true }));
  };

  const handlePopoverClose = (studentId: string) => {
    setIsPopoverOpen((prevState) => ({ ...prevState, [studentId]: false }));
  };

  // Update the selected checkbox state when a checkbox is changed
const handleCheckboxChange = (studentId: string, status: AttendanceStatus) => {
  setAttendanceStatus((prevState) => ({
    ...prevState,
    [studentId]: prevState[studentId] === status ? null : status,
  }));
};

// Handle saving attendance when the save button is pressed
const handleSaveAttendance = async () => {
  // Get the count of unmarked students
  const unmarkedStudents = studentAttendanceData.filter(({ student }) => attendanceStatus[student.id] === null);
  const unmarkedCount = unmarkedStudents.length;
  setUnmarkedStudentCount(unmarkedCount);

  // Show confirmation dialog if there are unmarked students, otherwise save attendance
  if (unmarkedCount > 0) {
    setShowConfirmationDialog(true);
  } else {
    await saveAttendance();
  }
};

// Save the attendance records
const saveAttendance = async () => {
  // Get the updated records based on the selected checkboxes
  const updatedRecords = getUpdatedRecords(studentAttendanceData, attendanceStatus);

  // Update the attendance records for each updated record
  await Promise.all(
    updatedRecords.map(async ({ student }) => {
      const selectedStatus = attendanceStatus[student.id];
      if (selectedStatus !== null) {
        await updateAttendanceRecord(student.id, AttendanceSession.Morning, selectedStatus);
      }
    })
  );

  // Fetch the updated attendance data and set it in the state
  const updatedAttendanceData = await fetchUpdatedAttendanceData();
  setStudentAttendanceData(updatedAttendanceData);

  // Show success alert with the current date
  const currentDate = new Date().toLocaleDateString();
  setAlertMessage(`Marking attendance complete for ${currentDate}. You will be able to access the attendance from stats panel.`);
  setShowAlertDialog(true);
};

  const handleLeaveClick = (studentId: string) => {
    setAttendanceStatus((prevState) => ({
      ...prevState,
      [studentId]: AttendanceStatus.OnLeave,
    }));
  };

  return {
    showAlertDialog,
    setShowAlertDialog,
    alertMessage,
    studentAttendanceData,
    isPopoverOpen,
    handlePopoverOpen,
    handlePopoverClose,
    attendanceStatus,
    handleCheckboxChange,
    showConfirmationDialog,
    setShowConfirmationDialog,
    handleSaveAttendance,
    saveAttendance,
    handleLeaveClick,
    unmarkedStudentCount,
  };
};

export default useAttendanceLogic;