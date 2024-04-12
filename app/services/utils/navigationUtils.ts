import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteNames, RootStackParamList } from './RouteNames';

type ControlRoomNavigationProp = NativeStackNavigationProp<RootStackParamList, RouteNames.ControlRoom>;

export const useHandleNavigateToScreen = (
  studentAttendanceData: any[],
  onClose: () => void
) => {
  const navigation = useNavigation<ControlRoomNavigationProp>();

  const handleNavigateToScreen = (screenName: keyof RootStackParamList) => {
    if (screenName === RouteNames.CaptureAttendance) {
      // Calculate total students
      const totalStudents = studentAttendanceData.length;
      console.log('Total Students:', totalStudents);

      // Calculate marked students
      const markedStudents = studentAttendanceData.filter(
        (item: any) => item.attendanceRecord?.morningStatus !== null && item.attendanceRecord?.morningStatus !== undefined
      ).length;
      console.log('Marked Students:', markedStudents);

      // Check if all students' attendance is marked
      const isAllAttendanceMarked = markedStudents === totalStudents;
      console.log('Is All Attendance Marked:', isAllAttendanceMarked);

      if (isAllAttendanceMarked) {
        // Navigate to AttendanceSummary screen if all attendance is marked
        console.log('Navigating to AttendanceSummary');
        navigation.navigate(RouteNames.AttendanceSummary);
      } else {
        // Navigate to CaptureAttendance screen if attendance is not fully marked
        console.log('Navigating to CaptureAttendance');
        navigation.navigate(RouteNames.CaptureAttendance);
      }
    } else {
      navigation.navigate(screenName);
    }
    onClose();
  };

  return handleNavigateToScreen;
};