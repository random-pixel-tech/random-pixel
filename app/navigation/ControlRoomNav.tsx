import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ControlRoom from "../screens/controlRoom/ControlRoom";
import CaptureAttendance from "../screens/controlRoom/Attendance/AttendanceCapture/CaptureAttendance";
import { RouteNames } from "../services/utils/RouteNames";
import AttendanceProvider from "../services/utils/api/useAttendanceLogic";
import AttendanceSummary from "../screens/controlRoom/Attendance/AttendanceCapture/AttendanceSummary/AttendanceSummary";
import AttendanceStats from "../screens/controlRoom/Attendance/AttendanceStats/AttendanceStats";

const Stack = createNativeStackNavigator();

const ControlRoomNav = () => {
  return (
    <AttendanceProvider>
      <Stack.Navigator initialRouteName={RouteNames.ControlRoom}>
        <Stack.Group>
          <Stack.Screen
            name={RouteNames.ControlRoom}
            component={ControlRoom}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name={RouteNames.CaptureAttendance}
            component={CaptureAttendance}
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name={RouteNames.AttendanceSummary}
            component={AttendanceSummary}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Screen
          name={RouteNames.AttendanceStats}
          component={AttendanceStats}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </AttendanceProvider>
  );
};


export default ControlRoomNav;
