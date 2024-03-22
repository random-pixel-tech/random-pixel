import { createStyle } from '@gluestack-style/react';

export const ActionsheetItemText = createStyle({
  mx: '$2',
  props: {
    size: 'sm',
  },
  color: '$pixPrimaryDark50',
  _dark: {
    color: '$textDark100',
  },
});
