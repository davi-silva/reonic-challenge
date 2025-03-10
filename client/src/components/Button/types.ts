import { ReactElement } from 'react';

export type Theme = 'primary' | 'secondary' | 'tertiary';

export type ButtonProps = {
  type?: 'button' | 'submit';
  href?: string;
  children: string | ReactElement | ReactElement[];
  theme?: Theme;
  padding?: string;
  align?: 'left' | 'center' | 'right';
  size?: number;
  fullWidth?: boolean;
  isDisabled?: boolean;
  dataTestId?: string;
  title?: string;
  onClick?: () => void;
};
