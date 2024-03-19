import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Modal, Dimensions, PanResponder, Animated } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Center, Box, Text } from '@gluestack-ui/themed';
import { Entypo } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

type RootStackParamList = {
  ControlRoom: undefined;
  Screen1: undefined;
  Screen2: undefined;
  Screen3: undefined;
  Screen4: undefined;
};

type ControlRoomScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ControlRoom'>;

interface ControlRoomProps {
  navigation: ControlRoomScreenNavigationProp;
}

const Screen1 = () => (
  <Center flex={1} bg="#EBEAFF">
    <Text>Screen 1</Text>
  </Center>
);

const Screen2 = () => (
  <Center flex={1} bg="#EBEAFF">
    <Text>Screen 2</Text>
  </Center>
);

const Screen3 = () => (
  <Center flex={1} bg="#EBEAFF">
    <Text>Screen 3</Text>
  </Center>
);

const Screen4 = () => (
  <Center flex={1} bg="#EBEAFF">
    <Text>Screen 4</Text>
  </Center>
);

const ControlRoom: React.FC<ControlRoomProps> = ({ navigation }) => {
  const windowHeight = Dimensions.get('window').height;
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);
  const [dragY] = useState(new Animated.Value(0));
  const translateY = dragY.interpolate({
    inputRange: [0, windowHeight - 100],
    outputRange: [0, windowHeight - 100],
    extrapolate: 'clamp',
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, gestureState) => {
      dragY.setValue(gestureState.dy);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 50) {
        handleCloseBottomDrawer();
      } else {
        Animated.spring(dragY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleOpenBottomDrawer = () => {
    setIsBottomDrawerOpen(true);
    dragY.setValue(0);
  };

  const handleCloseBottomDrawer = () => {
    Animated.spring(dragY, {
      toValue: windowHeight - 100,
      useNativeDriver: true,
    }).start(() => setIsBottomDrawerOpen(false));
  };

  return (
    <Box flexDirection="column" alignItems="center">
      <Box flexDirection="row">
        <TouchableOpacity onPress={handleOpenBottomDrawer}>
          <Box
            bg="#EBEAFF"
            aspectRatio={1}
            borderRadius={8}
            p={16}
            m={16}
          >
            <Center height="100%" justifyContent="space-evenly">
              <Entypo name="attachment" size={56} />
              <Text>Attendance</Text>
            </Center>
          </Box>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Screen2')}>
          <Box
            bg="#EBEAFF"
            aspectRatio={1}
            borderRadius={8}
            p={16}
            m={16}
          >
            <Center height="100%" justifyContent="space-evenly">
              <Entypo name="attachment" size={56} />
              <Text>Attendance</Text>
            </Center>
          </Box>
        </TouchableOpacity>
      </Box>
      
      <Box flexDirection="row">
        <TouchableOpacity onPress={() => navigation.navigate('Screen3')}>
          <Box
            bg="#EBEAFF"
            aspectRatio={1}
            borderRadius={8}
            p={16}
            m={16}
          >
            <Center height="100%" justifyContent="space-evenly">
              <Entypo name="attachment" size={56} />
              <Text>Attendance</Text>
            </Center>
          </Box>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Screen4')}>
          <Box
            bg="#EBEAFF"
            aspectRatio={1}
            borderRadius={8}
            p={16}
            m={16}
          >
            <Center height="100%" justifyContent="space-evenly">
              <Entypo name="attachment" size={56} />
              <Text>Attendance</Text>
            </Center>
          </Box>
        </TouchableOpacity>
      </Box>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomDrawerOpen}
        onRequestClose={handleCloseBottomDrawer}
      >
        <Animated.View
          style={[styles.drawer, { transform: [{ translateY }] }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragBar} />
          <Box flexDirection="column">
            <Text size='sm' py='$1'>Capture Attendance</Text>
            <Text size='sm' py='$1'>View Attendance for Class</Text>
            <Text size='sm' py='$1'>View Attendance for Student</Text>
            <Text size='sm' py='$1'>Generate Report</Text>
          </Box>
        </Animated.View>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingVertical: 23,
    paddingHorizontal: 25,
  },
  
  drawerContent: {
    fontSize: 14,
    display: 'flex',
    flexDirection: 'column',
  },
  dragBar: {
    width: 50,
    height: 5,
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
});

const App = () => {
  return (
    <Drawer.Navigator initialRouteName="ControlRoom">
      <Stack.Screen name="Control Room" component={ControlRoom} options={{
        headerLeft: () => null,
      }} />
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="Screen3" component={Screen3} />
      <Stack.Screen name="Screen4" component={Screen4} />
    </Drawer.Navigator>
  );
};

export default App;
