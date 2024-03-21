import React, { useState } from 'react';
import { Box, Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator } from '@gluestack-ui/themed';
import { useRef } from 'react';
import ConrolRoomBox from '../../components/ConrolRoomBox';

const ControlRoom: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const initialFocusRef = useRef(null);

  const handleFirstBoxPress = () => {
    setShowActionSheet(true);
  };

  const handleCloseActionSheet = () => {
    setShowActionSheet(false);
  };

  return (
    <Box flexDirection="column" alignItems="center">
      <Box flexDirection="row">
        <ConrolRoomBox onPress={handleFirstBoxPress} title="Attendance" />
        <ConrolRoomBox title="Attendance" />
      </Box>
      <Box flexDirection="row">
        <ConrolRoomBox title="Attendance" />
        <ConrolRoomBox title="Attendance" />
      </Box>

      <Actionsheet isOpen={showActionSheet} onClose={handleCloseActionSheet} initialFocusRef={initialFocusRef}>
        <ActionsheetBackdrop />
        <ActionsheetContent >
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleCloseActionSheet}>
            <ActionsheetItemText>Capture Attendance</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleCloseActionSheet}>
            <ActionsheetItemText>View Attendance for Class</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleCloseActionSheet}>
            <ActionsheetItemText>View Attendance for Student</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleCloseActionSheet}>
            <ActionsheetItemText>Generate Report</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};

export default ControlRoom;
