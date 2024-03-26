import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ControlRoom: undefined;
  CaptureAttendance: undefined;
  ClassAttendance: undefined;
  StudentAttendance: undefined;


};

type ControlRoomNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ControlRoom'>;

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef: React.RefObject<any>;
}

const ActionSheetComponent: React.FC<ActionSheetProps> = ({ isOpen, onClose, initialFocusRef }) => {
  const navigation = useNavigation<ControlRoomNavigationProp>();

  const handleCaptureAttendancePress = () => {
    navigation.navigate('CaptureAttendance');
    onClose();
  };

  const handleClassAttendancePress = () => {
    navigation.navigate('ClassAttendance')
    onClose();
  }

  const handleStudentAttendancePress = () => {
    navigation.navigate('StudentAttendance')
    onClose();
  }

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

export default ActionSheetComponent;