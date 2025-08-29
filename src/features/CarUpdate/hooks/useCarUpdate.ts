import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/app/redux/hooks';
import { CarRequest, carAPI, carActions, selectCar } from '@/etities/Car';
import { useForm } from 'react-hook-form';

export const useCarUpdate = () => {
  const dispatch = useDispatch();
  const car = useSelector(selectCar.selected);
  const [putCar, { data, isSuccess }] = carAPI.useUpdateCarMutation();

  const defaultFormValues = {
    name: car?.name || '',
    color: car?.color || '#ffffff',
  };

  const form = useForm<CarRequest>({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: defaultFormValues,
  });

  const isChanged = form.watch('name') !== car?.name || form.watch('color') !== car?.color;

  useEffect(() => {
    form.reset(defaultFormValues);
  }, [car, form.reset]);

  useEffect(() => {
    if (isSuccess && data) dispatch(carActions.mutateCar(data));
  }, [data, isSuccess, dispatch]);

  const updateCar = (data: CarRequest) => {
    if (!car) return;
    putCar({ id: car.id, data });
    dispatch(carActions.selectCar(null));
  };

  return { form, updateCar, isChanged };
};
