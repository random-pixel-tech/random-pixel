import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

enum RouteNames {
  ControlRoom = 'ControlRoom',
  CaptureAttendance = 'CaptureAttendance',
  ClassAttendance = 'ClassAttendance',
  StudentAttendance = 'StudentAttendance',
}

type RootStackParamList = {
  [RouteNames.ControlRoom]: undefined;
  [RouteNames.CaptureAttendance]: undefined;
  [RouteNames.ClassAttendance]: undefined;
  [RouteNames.StudentAttendance]: undefined;
};

type ControlRoomNavigationProp = NativeStackNavigationProp<RootStackParamList, RouteNames.ControlRoom>;

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef: React.RefObject<any>;
}

const AttendanceActionSheetComponent: React.FC<ActionSheetProps> = ({ isOpen, onClose, initialFocusRef }) => {
  const navigation = useNavigation<ControlRoomNavigationProp>();

  const handleCaptureAttendancePress = () => {
    navigation.navigate(RouteNames.CaptureAttendance);
    onClose();
  };
  
  const handleClassAttendancePress = () => {
    navigation.navigate(RouteNames.ClassAttendance);
    onClose();
  };
  
  const handleStudentAttendancePress = () => {
    navigation.navigate(RouteNames.StudentAttendance);
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} initialFocusRef={initialFocusRef}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={handleCaptureAttendancePress}>
          <ActionsheetItemText>Capture Attendance</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={handleClassAttendancePress}>
          <ActionsheetItemText>View Attendance for Class</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={handleStudentAttendancePress}>
          <ActionsheetItemText>View Attendance for Student</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={onClose}>
          <ActionsheetItemText>Generate Report</ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default AttendanceActionSheetComponent;