// SignOutButton.tsx
import React from 'react';
import { Pressable } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { supabase } from "../services/utils/supabase";

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <Pressable onPress={handleSignOut}>
      <Box mb="$4">
        <Text ml="$4">Sign Out</Text>
      </Box>
    </Pressable>
  );
};

export default SignOutButton;
