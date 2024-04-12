import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator } from '@gluestack-ui/themed';
import { RouteNames } from '../services/utils/RouteNames';
import { useHandleNavigateToScreen } from '../services/utils/navigationUtils';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef: React.RefObject<any>;
  studentAttendanceData: any[]; // Add the studentAttendanceData prop
}

const AttendanceActionSheetComponent: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  initialFocusRef,
  studentAttendanceData,
}) => {
  const handleNavigateToScreen = useHandleNavigateToScreen(studentAttendanceData, onClose);

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