import React, { useState, useRef, useContext } from "react";
import { Box } from "@gluestack-ui/themed";
import InteractiveBoxWithIcon from "../../components/InteractiveBoxWithIcon";
import AttendanceActionSheetComponent from "../../components/AttendanceActionSheetComponent";
import useAttendanceLogic, {
  CaptureAttendanceContext,
} from "../../services/utils/api/useAttendanceLogic";

const ControlRoom: React.FC = () => {
  const { studentAttendanceData } = useContext(CaptureAttendanceContext);
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
        <InteractiveBoxWithIcon
          onPress={handleFirstBoxPress}
          title="Attendance"
          icon="user-check"
        />
        <InteractiveBoxWithIcon title="Notices" icon="bullhorn" disabled={true} />
      </Box>
      <Box flexDirection="row">
        <InteractiveBoxWithIcon title="Classes" icon="person-chalkboard" disabled={true} />
        <InteractiveBoxWithIcon title="Calendar" icon="calendar" disabled={true} />
      </Box>

      <AttendanceActionSheetComponent
        isOpen={showActionSheet}
        onClose={handleCloseActionSheet}
        initialFocusRef={initialFocusRef}
        studentAttendanceData={studentAttendanceData}
      />
    </Box>
  );
};

export default ControlRoom;
