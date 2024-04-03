import { useState, useEffect } from 'react';
import useStudentAttendance, { AttendanceStatus, AttendanceSession, TeacherId } from '../../services/utils/api/useStudentAttendance';
import { getInitialAttendanceState, getUpdatedRecords } from './attendanceUtils';

const useAttendanceLogic = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [unmarkedStudentCount, setUnmarkedStudentCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');

  const { studentAttendanceData, updateAttendanceRecord, setStudentAttendanceData, fetchUpdatedAttendanceData } = useStudentAttendance();
  const [isPopoverOpen, setIsPopoverOpen] = useState<Record<string, boolean>>({});
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, AttendanceStatus | null>>({});
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  // Set initial attendance status when studentAttendanceData changes
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

  // Function for updating attendance status
  const handleAttendanceStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceStatus((prevState) => ({ ...prevState, [studentId]: prevState[studentId] === status ? null : status, }));
  };

  // Function for saving attendance
  const handleSaveAttendance = async () => {
    const unmarkedStudents = studentAttendanceData.filter(({ student }) => attendanceStatus[student.id] === null);
    const unmarkedCount = unmarkedStudents.length;
    setUnmarkedStudentCount(unmarkedCount);

    if (unmarkedCount > 0) {
      setShowConfirmationDialog(true);
    } else {
      await saveAttendance();
    }
  };

  // Function for saving attendance records
  const saveAttendance = async () => {
    const updatedRecords = getUpdatedRecords(studentAttendanceData, attendanceStatus);
    await Promise.all(
      updatedRecords.map(async ({ student }) => {
        const selectedStatus = attendanceStatus[student.id];
        if (selectedStatus !== null) {
          await updateAttendanceRecord(student.id, AttendanceSession.Morning, selectedStatus);
        }
      })
    );

    const updatedAttendanceData = await fetchUpdatedAttendanceData();
    setStudentAttendanceData(updatedAttendanceData);

    const currentDate = new Date().toLocaleDateString();
    setAlertMessage(`Marking attendance complete for ${currentDate}. You will be able to access the attendance from stats panel.`);
    setShowAlertDialog(true);
  };

  const handleLeaveClick = (studentId: string) => {
    setAttendanceStatus((prevState) => ({ ...prevState, [studentId]: AttendanceStatus.OnLeave, }));
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
    handleAttendanceStatusChange,
    showConfirmationDialog,
    setShowConfirmationDialog,
    handleSaveAttendance,
    saveAttendance,
    handleLeaveClick,
    unmarkedStudentCount,
  };
};

export default useAttendanceLogic;