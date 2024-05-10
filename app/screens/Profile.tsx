import { Button, ButtonText, Center } from "@gluestack-ui/themed";
import React from "react";
import { View, Text } from "react-native";
import SignOutButton from "../extras/SignOutButton";

const Profile: React.FC = () => {
  return (
    <Center>
      <SignOutButton />
    </Center>
  );
};

export default Profile;
