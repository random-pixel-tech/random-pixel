import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator } from '@gluestack-ui/themed';
import { RouteNames } from '../services/utils/RouteNames';
import { useHandleNavigateToScreen } from '../services/utils/navigationUtils';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../services/utils/colors';

interface ActionSheetProps {
 isOpen: boolean;
 onClose: () => void;
 initialFocusRef: React.RefObject<any>;
 studentAttendanceData: any[];
}


const AttendanceActionSheetComponent: React.FC<ActionSheetProps> = ({
 isOpen,
 onClose,
 initialFocusRef,
 studentAttendanceData,
}) => {
 const { handleControlRoomNavigation } = useHandleNavigateToScreen(studentAttendanceData, onClose);


 return (
   <Actionsheet isOpen={isOpen} onClose={onClose} initialFocusRef={initialFocusRef}>
     <ActionsheetBackdrop />
     <ActionsheetContent h="$1/2">
       <ActionsheetDragIndicatorWrapper>
         <ActionsheetDragIndicator />
       </ActionsheetDragIndicatorWrapper>
       <ActionsheetItem onPress={() => handleControlRoomNavigation(RouteNames.CaptureAttendance)} py="$4">
       <FontAwesomeIcon icon="clipboard-user" size={20} color={Colors.Primary}/>
         <ActionsheetItemText fontSize="$md">Capture Attendance</ActionsheetItemText>
       </ActionsheetItem>
       <ActionsheetItem onPress={() => handleControlRoomNavigation(RouteNames.AttendanceStats)} py="$4">
       <FontAwesomeIcon icon="square-poll-vertical" size={20} color={Colors.Primary} />
         <ActionsheetItemText fontSize="$md">View Attendance Data</ActionsheetItemText>
       </ActionsheetItem>
       <ActionsheetItem onPress={onClose} py="$4">
       <FontAwesomeIcon icon="file-pen" size={20} color={Colors.Primary}/>
         <ActionsheetItemText fontSize="$md">Generate Report</ActionsheetItemText>
       </ActionsheetItem>
     </ActionsheetContent>
   </Actionsheet>
 );
};


export default AttendanceActionSheetComponent;
