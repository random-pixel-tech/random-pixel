import { useState, useEffect } from 'react';
import useStudentAttendance, { AttendanceStatus, AttendanceSession } from '../../services/utils/api/useStudentAttendance';
import { getInitialSelectedCheckbox, getUpdatedRecords } from './attendanceUtils';

const useAttendanceLogic = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [unmarkedStudentCount, setUnmarkedStudentCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const { studentAttendanceData, updateAttendanceRecord, setStudentAttendanceData, fetchUpdatedAttendanceData } = useStudentAttendance();
  const [isPopoverOpen, setIsPopoverOpen] = useState<Record<string, boolean>>({});
  const [selectedCheckbox, setSelectedCheckbox] = useState<Record<string, AttendanceStatus | null>>({});
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    const initialSelectedCheckbox = getInitialSelectedCheckbox(studentAttendanceData);
    setSelectedCheckbox(initialSelectedCheckbox);
  }, [studentAttendanceData]);

  const handleOpenPopover = (studentId: string) => {
    setIsPopoverOpen((prevState) => ({ ...prevState, [studentId]: true }));
  };

  const handleClosePopover = (studentId: string) => {
    setIsPopoverOpen((prevState) => ({ ...prevState, [studentId]: false }));
  };

  const handleCheckboxChange = (studentId: string, status: AttendanceStatus) => {
    setSelectedCheckbox((prevState) => ({
      ...prevState,
      [studentId]: prevState[studentId] === status ? null : status,
    }));
  };

  const handleSaveAttendance = async () => {
    const unmarkedStudents = studentAttendanceData.filter(({ student }) => selectedCheckbox[student.id] === null);
    const unmarkedCount = unmarkedStudents.length;
    setUnmarkedStudentCount(unmarkedCount);

    if (unmarkedCount > 0) {
      setShowConfirmationDialog(true);
    } else {
      await saveAttendance();
    }
  };

  const saveAttendance = async () => {
    const updatedRecords = getUpdatedRecords(studentAttendanceData, selectedCheckbox);

    await Promise.all(
      updatedRecords.map(async ({ student }) => {
        const selectedStatus = selectedCheckbox[student.id];
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
    setSelectedCheckbox((prevState) => ({
      ...prevState,
      [studentId]: AttendanceStatus.Leave,
    }));
  };

  return {
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
  };
};

export default useAttendanceLogic;