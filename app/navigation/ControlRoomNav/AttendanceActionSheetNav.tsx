import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ControlRoom from '../../screens/ControlRoomScreen/ControlRoom';
import CaptureAttendance from '../../screens/ControlRoomScreen/CaptureAttendance/CaptureAttendance';
import ClassAttendance from '../../screens/ControlRoomScreen/ClassAttendance';
import StudentAttendance from '../../screens/ControlRoomScreen/StudentAttendance';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Pressable } from '@gluestack-ui/themed';

const Stack = createNativeStackNavigator();

const AttendanceActionSheetNav = () => {
  
  return (
    <Stack.Navigator initialRouteName="Control Room" >
      <Stack.Screen name="Control Room" component={ControlRoom} options={{
        headerShown: true
    }}/>
     <Stack.Screen
        name="CaptureAttendance"
        component={CaptureAttendance}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="ClassAttendance" component={ClassAttendance}/>
      <Stack.Screen name="StudentAttendance" component={StudentAttendance}/>

    </Stack.Navigator>
  );
};

export default AttendanceActionSheetNav