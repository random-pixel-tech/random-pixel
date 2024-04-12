import { useState, useEffect } from 'react';
import useStudentAttendance, { TeacherId } from './useStudentAttendance';
import { getInitialAttendanceState, getUpdatedRecords } from '../attendanceUtils';
import { AttendanceStatus, AttendanceSession } from '../enums';
const useAttendanceLogic = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [unmarkedStudentCount, setUnmarkedStudentCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');

  const { studentAttendanceData, updateAttendanceRecord, setStudentAttendanceData, fetchUpdatedAttendanceData, className, today, section } = useStudentAttendance();
  const [isPopoverOpen, setIsPopoverOpen] = useState<Record<string, boolean>>({});
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, AttendanceStatus | null>>({});
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<AttendanceStatus | null>(null);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  const handleOptionsMenuOpen = () => {
    setIsOptionsMenuOpen(true);
  };

  const handleOptionsMenuClose = () => {
    setIsOptionsMenuOpen(false);
  };

  const handleIconPress = async () => {
    if (isOptionsMenuOpen) {
      handleOptionsMenuClose();
    } else {
      handleOptionsMenuOpen();
    }
  };

  const handleStatusClick = (status: AttendanceStatus | null) => {
    setSelectedStatus(status);
  };

  // filter the students based on the selected status
  const getFilteredStudents = () => {
    if (selectedStatus === null) {
      return studentAttendanceData;
    }
  
    return studentAttendanceData.filter(({ attendanceRecord }) => {
      return attendanceRecord?.morningStatus === selectedStatus;
    });
  };

  // Calculate students based on their status

  const presentCount = studentAttendanceData.filter(
    (item) => item.attendanceRecord?.morningStatus === AttendanceStatus.Present
  ).length;
  const absentCount = studentAttendanceData.filter(
    (item) => item.attendanceRecord?.morningStatus === AttendanceStatus.Absent
  ).length;
  const onLeaveCount = studentAttendanceData.filter(
    (item) => item.attendanceRecord?.morningStatus === AttendanceStatus.OnLeave
  ).length;

  // Calculate marked students and total students
  const totalStudents = studentAttendanceData.length;

  // Calculate marked students based on selected checkboxes
  const markedStudents = Object.values(attendanceStatus).filter((status) => status !== null).length;

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
 const handleAttendanceStatusChange = (studentId: string, status: AttendanceStatus | null) => {
  setAttendanceStatus((prevState) => {
    const currentStatus = prevState[studentId];
    if (currentStatus === AttendanceStatus.OnLeave && status === AttendanceStatus.Absent) {
      return { ...prevState, [studentId]: null };
    } else if (currentStatus === status) {
      return { ...prevState, [studentId]: null };
    } else {
      return { ...prevState, [studentId]: status };
    }
  });
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
    className,
    today,
    totalStudents,
    markedStudents,
    selectedStatus,
    handleStatusClick,
    getFilteredStudents,
    presentCount,
    absentCount,
    onLeaveCount,
    section,
    isOptionsMenuOpen,
    handleOptionsMenuOpen,
    handleOptionsMenuClose,
    handleIconPress
  };
};

export default useAttendanceLogic;