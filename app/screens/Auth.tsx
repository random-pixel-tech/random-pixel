import React, { useState } from "react";
import { Alert, View, AppState } from "react-native";
import { supabase } from "../services/utils/supabase";
// import { Button } from 'react-native-elements'
import {
  FormControl,
  VStack,
  Center,
  Image,
  Text,
  InputField,
  Input,
  InputSlot,
  InputIcon,
  Button,
  ButtonGroup,
  ButtonText,
  Divider,
  Box,
  FormControlLabel,
  FormControlLabelText,
  EyeIcon,
  EyeOffIcon,
} from "@gluestack-ui/themed";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const ErrorContainer = ({ error }: { error: any }) => {
  return (
    <View>
      <Text color="$error600">{error}</Text>
    </View>
  );
};

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState<any>(null);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error?.status === 400) {
      setError("Invalid email or password!");
    } else {
      console.log(error);
      setError("Try Again!");
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <Box h="100%" justifyContent="center" px="$4" $web-minHeight="100vh">
      <VStack alignItems="center" space="xl">
        <Center>
          <Text color="$black" lineHeight="$xs" fontWeight="$bold">
            {showLogin ? "Login" : "Sign Up"}
          </Text>
        </Center>

        <VStack space="xl" minWidth="$80">
          <FormControl isRequired={true}>
            <FormControlLabel mb="$1">
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField type="text" value={email} onChangeText={(text) => setEmail(text)} />
            </Input>
          </FormControl>

          <FormControl isRequired={true}>
            <FormControlLabel mb="$1">
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type={showPassword ? "text" : "password"}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <InputSlot pr="$3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </FormControl>
          {error && <ErrorContainer error={error} />}
          <ButtonGroup flexDirection="column" w="100%">
            <Button
              isDisabled={loading}
              onPress={() => (showLogin ? signInWithEmail() : signUpWithEmail())}
            >
              <ButtonText>{showLogin ? "Login" : "Sign Up"}</ButtonText>
            </Button>
          </ButtonGroup>
        </VStack>

        <Divider />
        <Text>{showLogin ? "Don't have an account?" : "Already have an account?"}</Text>
        <Button variant={"outline"} isDisabled={loading} onPress={() => setShowLogin(!showLogin)}>
          <ButtonText>{showLogin ? "Sign Up" : "Login"}</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
