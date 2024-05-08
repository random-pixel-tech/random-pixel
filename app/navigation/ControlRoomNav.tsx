import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ControlRoom from '../screens/ControlRoomScreen/ControlRoom';
import CaptureAttendance from '../screens/ControlRoomScreen/CaptureAttendance/CaptureAttendance';
import ClassAttendance from '../screens/ControlRoomScreen/ClassAttendance';
import StudentAttendance from '../screens/ControlRoomScreen/StudentAttendance';
import AttendanceSummary from '../screens/ControlRoomScreen/AttendanceSummary/AttendanceSummary';
import { RouteNames } from '../services/utils/RouteNames';
import AttendanceStats from '../screens/DashboardScreen/AttendanceStats';
import Dashboard from '../screens/DashboardScreen/Dashboard';


const Stack = createNativeStackNavigator();


const ControlRoomNav = () => {
 return (
   <Stack.Navigator initialRouteName={RouteNames.ControlRoom}>
     <Stack.Screen name={RouteNames.ControlRoom} component={ControlRoom} options={{ headerShown: true }} />
     <Stack.Screen name={RouteNames.CaptureAttendance} component={CaptureAttendance} options={{ headerShown: false }} />
     <Stack.Screen name={RouteNames.AttendanceSummary} component={AttendanceSummary} options={{ headerShown: false }} />
     <Stack.Screen name={RouteNames.AttendanceStats} component={AttendanceStats} options={{ headerShown: false }}
     />
   </Stack.Navigator>
 );
};


export default ControlRoomNav;
