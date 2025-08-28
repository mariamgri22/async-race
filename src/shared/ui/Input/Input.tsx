import clsx from 'clsx';
import { Input as AriaInput } from 'react-aria-components';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import styles from './Input.module.scss';

export enum InputTypes {
  TEXT = 'text',
  COLOR = 'color',
}

export enum InputKits {
  PRIMARY_M = 'primary-m',
  COLOR_M = 'color-m',
}

type Props = {
  kit?: InputKits;
  className?: string;
  type?: InputTypes;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  register?: UseFormRegister<Record<string, unknown>>;
  options?: RegisterOptions;
  validationError?: string;
};

export const Input = ({
  kit,
  type,
  name,
  placeholder,
  disabled,
  register,
  options,
  validationError,
  ...props
}: Props) => {
  const rHookFormProps = register && options && name ? register(name, { ...options }) : {};

  return (
    <label className={styles.main}>
      <AriaInput
        className={clsx(styles.input, styles[`input_kit_${kit}`])}
        type={type}
        placeholder={placeholder ?? ''}
        disabled={disabled}
        {...rHookFormProps}
        {...props}
      />
      {validationError && <span className={styles.error}>{validationError}</span>}
    </label>
  );
};
