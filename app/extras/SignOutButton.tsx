// SignOutButton.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { supabase } from '../utils/supabase';

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Box mb="$4">
        <Text ml="$4">Sign Out</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default SignOutButton;
