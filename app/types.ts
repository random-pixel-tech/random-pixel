// types.ts

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  Home: undefined;
  Conversation: undefined; // Assuming Conversation is another screen
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type ConversationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Conversation"
>;

export type BottomTabParamList = {
  Details: undefined;
  Reviews: undefined;
};

export type DetailsTabProps = BottomTabScreenProps<
  BottomTabParamList,
  "Details"
>;

export type ReviewsTabProps = BottomTabScreenProps<
  BottomTabParamList,
  "Reviews"
>;
