import { useState, useEffect, createContext } from "react";
import useStudentAttendance from "../services/utils/api/useStudentAttendance";
import {
  getInitialAttendanceState,
  getUpdatedRecords,
} from "../services/utils/attendanceUtils";
import { useDateAndTimeUtil } from "../services/utils/dateAndTimeUtils";
import {
  AttendanceSession,
  AttendanceStatus,
} from "../services/utils/enums";

interface CaptureAttendanceProps {
  children: React.ReactNode;
  initialSession?: AttendanceSession;
}

export const CaptureAttendanceContext = createContext<any | null>(
  null
);

const CaptureAttendanceProvider = ({
  children,
  initialSession = AttendanceSession.Morning,
}: CaptureAttendanceProps) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [unmarkedStudentCount, setUnmarkedStudentCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  const [initialAttendanceStatus, setInitialAttendanceStatus] =
    useState<Record<string, AttendanceStatus | null>>({});

  const { currentDay } = useDateAndTimeUtil();

  const {
    studentAttendanceData,
    updateAttendanceRecord,
    setStudentAttendanceData,
    fetchUpdatedAttendanceData,
    className,
    section,
  } = useStudentAttendance(currentDay);

  const [isPopoverOpen, setIsPopoverOpen] = useState<
    Record<string, boolean>
  >({});

  const [isSummaryPopoverOpen, setIsSummaryPopoverOpen] = useState<
    Record<string, boolean>
  >({});

  const [attendanceStatus, setAttendanceStatus] = useState<
    Record<string, AttendanceStatus | null>
  >({});
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<AttendanceStatus | null>(null);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  const [session, setSession] =
    useState<AttendanceSession>(initialSession);

  const handleSessionToggle = () => {
    setSession((prevSession) =>
      prevSession === AttendanceSession.Morning
        ? AttendanceSession.Afternoon
        : AttendanceSession.Morning
    );
  };

  const handleOptionsMenuOpen = () => {
    setIsOptionsMenuOpen(true);
  };

  const handleOptionsMenuClose = () => {
    setIsOptionsMenuOpen(false);
  };

  const toggleAttendanceCaptureMenu = async () => {
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
      return (
        attendanceRecord?.[`${session.toLowerCase()}_status`] ===
        selectedStatus
      );
    });
  };

  // Calculate students based on their status
  const presentCount = studentAttendanceData.filter(
    (item) =>
      item.attendanceRecord?.[`${session.toLowerCase()}_status`] ===
      AttendanceStatus.Present
  ).length;
  const absentCount = studentAttendanceData.filter(
    (item) =>
      item.attendanceRecord?.[`${session.toLowerCase()}_status`] ===
      AttendanceStatus.Absent
  ).length;
  const onLeaveCount = studentAttendanceData.filter(
    (item) =>
      item.attendanceRecord?.[`${session.toLowerCase()}_status`] ===
      AttendanceStatus.OnLeave
  ).length;

  // Calculate marked students and total students
  const totalStudents = studentAttendanceData.length;

  // Calculate marked students based on selected checkboxes
  const markedStudents = Object.values(attendanceStatus).filter(
    (status) => status !== null
  ).length;

  // Set initial attendance status when studentAttendanceData changes
  useEffect(() => {
    const initialAttendanceState = getInitialAttendanceState(
      studentAttendanceData,
      session
    );
    setAttendanceStatus(initialAttendanceState);
    setInitialAttendanceStatus(initialAttendanceState);
  }, [studentAttendanceData, session]);

  const checkAttendanceChanges = () => {
    return Object.keys(attendanceStatus).some((studentId) => {
      return (
        attendanceStatus[studentId] !==
        initialAttendanceStatus[studentId]
      );
    });
  };

  const handlePopoverOpen = (studentId: string) => {
    setIsPopoverOpen((prevState) => ({
      ...prevState,
      [studentId]: true,
    }));
  };

  const handlePopoverClose = (studentId: string) => {
    setIsPopoverOpen((prevState) => ({
      ...prevState,
      [studentId]: false,
    }));
  };

  const handleSummaryPopoverOpen = (studentId: string) => {
    setIsSummaryPopoverOpen((prevState) => ({
      ...prevState,
      [studentId]: true,
    }));
  };

  const handleSummaryPopoverClose = (studentId: string) => {
    setIsSummaryPopoverOpen((prevState) => ({
      ...prevState,
      [studentId]: false,
    }));
  };

  // Function for updating attendance status
  const handleAttendanceStatusChange = (
    studentId: string,
    status: AttendanceStatus | null
  ) => {
    setAttendanceStatus((prevState) => {
      const currentStatus = prevState[studentId];
      if (
        currentStatus === AttendanceStatus.OnLeave &&
        status === AttendanceStatus.Absent
      ) {
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
    const unmarkedStudents = studentAttendanceData.filter(
      ({ student }) => attendanceStatus[student.scholar_id] === null
    );
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
    const updatedRecords = getUpdatedRecords(
      studentAttendanceData,
      attendanceStatus,
      session
    );
    await Promise.all(
      updatedRecords.map(async ({ student }) => {
        const selectedStatus = attendanceStatus[student.scholar_id];
        if (selectedStatus !== null) {
          await updateAttendanceRecord(
            student.scholar_id,
            session,
            selectedStatus,
            currentDay
          );
        }
      })
    );

    const updatedAttendanceData = await fetchUpdatedAttendanceData();
    setStudentAttendanceData(updatedAttendanceData);

    const currentDate = new Date().toLocaleDateString();
    setAlertMessage(
      `Marking attendance complete for ${currentDate}. You will be able to access the attendance from stats panel.`
    );
    setShowAlertDialog(true);
  };

  const handleLeaveClick = (studentId: string) => {
    setAttendanceStatus((prevState) => ({
      ...prevState,
      [studentId]: AttendanceStatus.OnLeave,
    }));
  };

  return (
    <CaptureAttendanceContext.Provider
      value={{
        showAlertDialog,
        setShowAlertDialog,
        alertMessage,
        studentAttendanceData,
        isPopoverOpen,
        isSummaryPopoverOpen,
        handleSummaryPopoverOpen,
        handleSummaryPopoverClose,
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
        toggleAttendanceCaptureMenu,
        session,
        handleSessionToggle,
        checkAttendanceChanges,
      }}
    >
      {children}
    </CaptureAttendanceContext.Provider>
  );
};

export default CaptureAttendanceProvider;
