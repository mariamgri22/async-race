import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from '@/app/redux/hooks';
import { CarRequest, carAPI, carActions, selectCar } from '@/etities/Car';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { Input, InputKits, InputTypes } from '@/shared/ui/Input/Input';
import { validationOptions } from '@/shared/utils/validationForm';

import { InputNames } from '../types/types';

import styles from './CarUpdate.module.scss';

type Props = {
  className?: string;
};

export const CarUpdate = ({ className }: Props) => {
  // 0. Init

  const dispatch = useDispatch();
  const car = useSelector(selectCar.selected);
  const [putCar, { data, isSuccess }] = carAPI.useUpdateCarMutation();

  const defaultFormValues = {
    [InputNames.NAME]: car?.name || '',
    [InputNames.COLOR]: car?.color || '#ffffff',
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<CarRequest>({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: defaultFormValues,
  });

  const isChanged = watch(InputNames.NAME) !== car?.name || watch(InputNames.COLOR) !== car?.color;

  // 1. Update

  useEffect(() => {
    reset(defaultFormValues);
  }, [car, reset]);

  function updateCar(data: CarRequest) {
    if (!car) return;
    putCar({ id: car?.id, data });
    dispatch(carActions.selectCar(null));
  }

  useEffect(() => {
    if (isSuccess && data) dispatch(carActions.mutateCar(data));
  }, [data, isSuccess, dispatch]);

  // Render

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
