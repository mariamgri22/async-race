import clsx from 'clsx';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { Input, InputKits, InputTypes } from '@/shared/ui/Input/Input';
import { validationOptions } from '@/shared/utils/validationForm';

import { InputNames } from '../types/types';

import styles from './CarUpdate.module.scss';
import { useCarUpdate } from '@/features/CarUpdate/hooks/useCarUpdate';

type Props = {
  className?: string;
};

export const CarUpdate = ({ className }: Props) => {
  const { form, updateCar, isChanged } = useCarUpdate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  return (
    <form className={clsx(styles.form, className)} onSubmit={handleSubmit(updateCar)}>
      <Input
        kit={InputKits.PRIMARY_M}
        placeholder="SELECT CAR"
        type={InputTypes.TEXT}
        register={register}
        options={validationOptions.TEXT_REQUIRED}
        name={InputNames.NAME}
        validationError={errors[InputNames.NAME]?.message}
      />
      <Input
        kit={InputKits.COLOR_M}
        type={InputTypes.COLOR}
        register={register}
        options={validationOptions.COLOR_REQUIRED}
        name={InputNames.COLOR}
      />
      <Button kit={ButtonKits.PRYMARY_M_PURPLE} type="submit" disabled={!isChanged || !isValid}>
        UPDATE
      </Button>
    </form>
  );
};
