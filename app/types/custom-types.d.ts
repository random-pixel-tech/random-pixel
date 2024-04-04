import { useNavigation } from '@react-navigation/native';

type CustomNavigation = typeof useNavigation;

declare module '@react-navigation/native' {
  export const useNavigation: () => CustomNavigation;
}
