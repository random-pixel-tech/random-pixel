import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState } from 'react-native'
import { supabase } from '../services/utils/supabase'
// import { Button } from 'react-native-elements'
import { FormControl, VStack, Center, Image, Text, InputField, Input, InputSlot, InputIcon, Button, ButtonGroup, ButtonText } from '@gluestack-ui/themed'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

    const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <FormControl
      px='$4'
      py="$8"
      minWidth="75%"
      $web-minWidth="30%"
      $web-borderWidth='$1'
      borderRadius='$lg'
      borderColor='$borderLight300'
      $dark-borderWidth='$1' $dark-borderRadius='$lg' $dark-borderColor='$borderDark800'
    >
      <VStack space='xl'>
        <Center>
          <Image
            size="md"
            source={{
              uri: "https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/1024px/1f499.png",
            }}
            alt="Logo"
          />
        </Center>

        <VStack space='xs'>
          <Text color='$black' lineHeight='$xs'>
            Email
          </Text>
          <Input>
            <InputField
              type="text"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Input>
        </VStack>
        <VStack space='xs'>
          <Text color='$black' lineHeight='$xs'>
            Password
          </Text>
          <Input>
            <InputField
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <InputSlot pr='$3' onPress={handleState}>
              {/* <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color='$darkBlue500' /> */}
            </InputSlot>
          </Input>
        </VStack>
        
       
        <ButtonGroup flexDirection='column' w="100%">
          <Button isDisabled={loading} onPress={() => signInWithEmail()}>
            <ButtonText>Sign in</ButtonText>
          </Button>
          <Button isDisabled={loading} onPress={() => signUpWithEmail()}>
            <ButtonText>Sign up</ButtonText>
          </Button>
        </ButtonGroup>
      </VStack>
    </FormControl>

  )
}

