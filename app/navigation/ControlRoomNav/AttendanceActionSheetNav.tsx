import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ControlRoom from '../../screens/ControlRoomScreen/ControlRoom';
import CaptureAttendance from '../../screens/ControlRoomScreen/CaptureAttendance/CaptureAttendance';
import ClassAttendance from '../../screens/ControlRoomScreen/ClassAttendance';
import StudentAttendance from '../../screens/ControlRoomScreen/StudentAttendance';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Pressable } from '@gluestack-ui/themed';
import { RouteNames } from '../../components/AttendanceActionSheetComponent';

const Stack = createNativeStackNavigator();

const AttendanceActionSheetNav = () => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.ControlRoom}>
      <Stack.Screen name={RouteNames.ControlRoom} component={ControlRoom} options={{ headerShown: true }} />
      <Stack.Screen name={RouteNames.CaptureAttendance} component={CaptureAttendance} options={{ headerShown: false }} />
      <Stack.Screen name={RouteNames.ClassAttendance} component={ClassAttendance} />
      <Stack.Screen name={RouteNames.StudentAttendance} component={StudentAttendance} />
    </Stack.Navigator>
  );
};

export default AttendanceActionSheetNav;