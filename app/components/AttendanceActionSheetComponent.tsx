import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteNames, RootStackParamList } from '../services/utils/RouteNames';

type ControlRoomNavigationProp = NativeStackNavigationProp<RootStackParamList, RouteNames.ControlRoom>;

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef: React.RefObject<any>;
}

const AttendanceActionSheetComponent: React.FC<ActionSheetProps> = ({ isOpen, onClose, initialFocusRef }) => {
  const navigation = useNavigation<ControlRoomNavigationProp>();

  const handleNavigateToScreen = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} initialFocusRef={initialFocusRef}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={() => handleNavigateToScreen(RouteNames.CaptureAttendance)}>
          <ActionsheetItemText>Capture Attendance</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={() => handleNavigateToScreen(RouteNames.ClassAttendance)}>
          <ActionsheetItemText>View Attendance for Class</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={() => handleNavigateToScreen(RouteNames.StudentAttendance)}>
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