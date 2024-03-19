// import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Screen2 from "../../screens/ControlRoom/Screen2";
// import Screen3 from "../../screens/ControlRoom/Screen3";
// import Screen4 from "../../screens/ControlRoom/Screen4";
// import ControlRoom from '../../screens/ControlRoom/ControlRoom';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// type RootStackParamList = {
//   ControlRoom: undefined;
//   Screen2: undefined;
//   Screen3: undefined;
//   Screen4: undefined;
// };

// type ControlRoomScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ControlRoom'>;

// const ControlRoomNav = () => {
//   return (
//     <Drawer.Navigator initialRouteName="ControlRoom">
//       <Stack.Screen name="Control Room" component={ControlRoom} options={{
//         headerLeft: () => null,
//       }} />
//       <Stack.Screen name="Screen2" component={Screen2} />
//       <Stack.Screen name="Screen3" component={Screen3} />
//       <Stack.Screen name="Screen4" component={Screen4} />
//     </Drawer.Navigator>
//   );
// };

// export default ControlRoomNav