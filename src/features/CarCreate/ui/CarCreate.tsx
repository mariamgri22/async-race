import clsx from 'clsx';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { Input, InputKits, InputTypes } from '@/shared/ui/Input/Input';
import { Modal } from '@/shared/ui/Modal/Modal';
import { validationOptions } from '@/shared/utils/validationForm';
import { InputNames } from '../types/types';

import styles from './CarCreate.module.scss';
import { useCarCreate } from '../hooks/useCarCreate';

type Props = {
  className?: string;
};

export const CarCreate = ({ className }: Props) => {
  const { isOpen, setOpen, responseData, formMethods, createCar } = useCarCreate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = formMethods;

  return (
    <>
      <form className={clsx(styles.form, className)} onSubmit={handleSubmit(createCar)}>
        <Input
          kit={InputKits.PRIMARY_M}
          placeholder="TYPE CAR BRAND"
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
        <Button kit={ButtonKits.PRYMARY_M_PURPLE} type="submit" disabled={!isValid}>
          CREATE
        </Button>
      </form>
      <Modal isOpen={isOpen} onOpenChange={setOpen}>
        <article className={styles.created}>
          <h2>NEW CAR CREATED:</h2>
          <p>{responseData?.name?.toUpperCase()}</p>
        </article>
      </Modal>
    </>
  );
};
