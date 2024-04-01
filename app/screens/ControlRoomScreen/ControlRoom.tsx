import React, { useState, useRef } from 'react';
import { Box } from '@gluestack-ui/themed';
import InteractiveBoxWithIcon from '../../components/InteractiveBoxWithIcon';
import AttendanceActionSheetComponent from '../../components/AttendanceActionSheetComponent';

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
        <InteractiveBoxWithIcon onPress={handleFirstBoxPress} title="Attendance" />
        <InteractiveBoxWithIcon title="Attendance" />
      </Box>
      <Box flexDirection="row">
        <InteractiveBoxWithIcon title="Attendance" />
        <InteractiveBoxWithIcon title="Attendance" />
      </Box>

      <AttendanceActionSheetComponent isOpen={showActionSheet} onClose={handleCloseActionSheet} initialFocusRef={initialFocusRef} />
    </Box>
  );
};

export default ControlRoom;
