// CustomDrawerContent.tsx
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Box, Center, Image } from '@gluestack-ui/themed';
import { SimpleLineIcons } from '@expo/vector-icons';
import SignOutButton from './SignOutButton';

const CustomDrawerContent = (props: any) => {
  return (
    <Box flex={1}>
      <DrawerContentScrollView {...props}>
        <Center p="$5">
          <Image
            size="md"
            source={{
              uri: "https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/1024px/1f499.png",
            }}
            alt="Logo"
          />
        </Center>
        <DrawerItemList {...props} flex={1} />
      </DrawerContentScrollView>
      <Box flexDirection='row' alignContent='center' mb='$4'>
        <SimpleLineIcons name="logout" size={20} style={{ marginLeft: 16, marginRight: -5 }} />
        <SignOutButton />
      </Box>
    </Box>
  );
};

export default CustomDrawerContent;
