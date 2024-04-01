import { useState, useEffect } from 'react';
import useStudentAttendance from '../../services/utils/api/useStudentAttendance';

const useAttendanceLogic = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const {
    studentAttendanceData,
    updateAttendanceRecord,
    setStudentAttendanceData,
    fetchUpdatedAttendanceData,
  } = useStudentAttendance();
  const [isPopoverOpen, setIsPopoverOpen] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedCheckbox, setSelectedCheckbox] = useState<
    Record<string, 'present' | 'absent' | 'leave' | null>
  >({});
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    const initialSelectedCheckbox: Record<
      string,
      'present' | 'absent' | 'leave' | null
    > = {};
    studentAttendanceData.forEach(({ student, attendanceRecord }) => {
      initialSelectedCheckbox[student.id] = attendanceRecord?.morning_status || null;
    });
    setSelectedCheckbox(initialSelectedCheckbox);
  }, [studentAttendanceData]);

  const handleOpenPopover = (studentId: string) => {
    setIsPopoverOpen((prevState) => ({ ...prevState, [studentId]: true }));
  };

  const handleClosePopover = (studentId: string) => {
    setIsPopoverOpen((prevState) => ({ ...prevState, [studentId]: false }));
  };

  const handleCheckboxChange = (
    studentId: string,
    status: 'present' | 'absent' | 'leave'
  ) => {
    setSelectedCheckbox((prevState) => ({
      ...prevState,
      [studentId]: prevState[studentId] === status ? null : status,
    }));
  };

  const handleSaveAttendance = async () => {
    const hasUnmarkedStudents = studentAttendanceData.some(
      ({ student }) => selectedCheckbox[student.id] === null
    );

    if (hasUnmarkedStudents) {
      setShowConfirmationDialog(true);
    } else {
      await saveAttendance();
    }
  };

  const saveAttendance = async () => {
    const updatedRecords = studentAttendanceData.filter(
      ({ student, attendanceRecord }) => {
        const selectedStatus = selectedCheckbox[student.id];
        return (
          (attendanceRecord && attendanceRecord.morning_status !== selectedStatus) ||
          (!attendanceRecord && selectedStatus !== null)
        );
      }
    );

    await Promise.all(
      updatedRecords.map(async ({ student }) => {
        const selectedStatus = selectedCheckbox[student.id];
        if (selectedStatus !== null) {
          await updateAttendanceRecord(student.id, 'morning', selectedStatus);
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
      [studentId]: 'leave',
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
    handleLeaveClick
  };
};

export default useAttendanceLogic;