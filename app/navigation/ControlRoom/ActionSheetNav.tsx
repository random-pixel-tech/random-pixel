import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ControlRoom from '../../screens/ControlRoom/ControlRoom';
import CaptureAttendance from '../../screens/ControlRoom/CaptureAttendance';
import ClassAttendance from '../../screens/ControlRoom/ClassAttendance';
import StudentAttendance from '../../screens/ControlRoom/StudentAttendance';

const Stack = createNativeStackNavigator();

const ActionSheetNav = () => {
  return (
    <Stack.Navigator initialRouteName="Control Room" >
      <Stack.Screen name="Control Room" component={ControlRoom} options={{
        headerShown: true
    }}/>
      <Stack.Screen name="CaptureAttendance" component={CaptureAttendance}/>
      <Stack.Screen name="ClassAttendance" component={ClassAttendance}/>
      <Stack.Screen name="StudentAttendance" component={StudentAttendance}/>

    </Stack.Navigator>
  );
};

export default ActionSheetNav