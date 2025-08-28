import clsx from 'clsx';
import { Button as AriaButton, PressEvent } from 'react-aria-components';

import styles from './Button.module.scss';

export enum ButtonKits {
  CLEAR = 'clear',
  PRYMARY_M_GREEN = 'primary-m-green',
  PRYMARY_M_PURPLE = 'primary-m-purple',
  PRYMARY_S_BLUE = 'primary-s-blue',
  PRYMARY_S_PURPLE = 'primary-s-purple',
  PRYMARY_S_YELLOW = 'primary-s-yellow',
  PRYMARY_S_GREEN = 'primary-s-green',
  TABLE_M_YELLOW = 'table-m-yellow',
}

type ButtonProps = {
  kit: ButtonKits;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: ((e: PressEvent) => void) | undefined;
  children: React.ReactNode;
};

export const Button = ({
  kit,
  className,
  style,
  type = 'button',
  disabled = false,
  onClick,
  children,
  ...props
}: ButtonProps) => {
  return (
    <AriaButton
      className={clsx(styles.button, styles[`button_kit_${kit}`], className)}
      isDisabled={disabled}
      type={type}
      onPress={onClick}
      style={style}
      {...props}
    >
      {children}
    </AriaButton>
  );
};
