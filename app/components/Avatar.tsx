import { PlatformPressable } from '@react-navigation/elements';
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import * as React from 'react';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@gluestack-ui/themed';

import type { DrawerNavigationProp } from '@react-navigation/drawer';

type Props = {
  accessibilityLabel?: string;
  pressColor?: string;
  pressOpacity?: number;
  tintColor?: string;
};

export default function ProfileAvatar({ tintColor, ...rest }: Props) {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <PlatformPressable
      {...rest}
      accessible
      accessibilityRole="button"
      android_ripple={{ borderless: true }}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={styles.touchable}
    //   hitSlop={Platform.select({
    //     ios: undefined,
    //     default: { top: 16, right: 16, bottom: 16, left: 16 },
    //   })}
    >
      <Avatar bgColor="$primary500" size="md" borderRadius="$full">
        <AvatarFallbackText>Anukrati Mehta</AvatarFallbackText>
      </Avatar>
    </PlatformPressable>
  );
}

const styles = {
  touchable: {
    marginHorizontal: 11,
  },
};
