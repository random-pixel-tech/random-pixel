import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteNames, RootStackParamList } from './RouteNames';

type ControlRoomNavigationProp = NativeStackNavigationProp<RootStackParamList, RouteNames.ControlRoom>;
type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, RouteNames.Dashboard>;

export const useHandleNavigateToScreen = (
  studentAttendanceData: any[],
  onClose: () => void
) => {
  const controlRoomNavigation = useNavigation<ControlRoomNavigationProp>();
  const dashboardNavigation = useNavigation<DashboardNavigationProp>();

  const handleControlRoomNavigation = (screenName: keyof RootStackParamList) => {
    if (screenName === RouteNames.CaptureAttendance) {
      // Calculate total students
      const totalStudents = studentAttendanceData.length;

      // Calculate marked students
      const markedStudents = studentAttendanceData.filter(
        (item: any) =>
          item.attendanceRecord?.morningStatus !== null &&
          item.attendanceRecord?.morningStatus !== undefined
      ).length;

      // Check if all students' attendance is marked
      const isAllAttendanceMarked = markedStudents > 0 && markedStudents === totalStudents;

      if (isAllAttendanceMarked) {
        // Navigate to AttendanceSummary screen if all attendance is marked
        controlRoomNavigation.navigate(RouteNames.AttendanceSummary);
      } else {
        // Navigate to CaptureAttendance screen if attendance is not fully marked
        controlRoomNavigation.navigate(RouteNames.CaptureAttendance);
      }
    } else {
      controlRoomNavigation.navigate(screenName);
    }
    onClose();
  };

  const handleDashboardNavigation = (screenName: keyof RootStackParamList) => {
    dashboardNavigation.navigate(screenName);
    onClose();
  };

  return { handleControlRoomNavigation, handleDashboardNavigation };
};