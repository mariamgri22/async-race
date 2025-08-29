import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CarRequest, carAPI } from '@/etities/Car';

export const useCarCreate = () => {
  const [isOpen, setOpen] = useState(false);
  const [postCar, { data: responseData }] = carAPI.usePostCarMutation();

  const defaultFormValues = {
    name: '',
    color: '#ffffff',
  };

  const formMethods = useForm<CarRequest>({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: defaultFormValues,
  });

  const createCar = async (requestData: CarRequest) => {
    try {
      await postCar(requestData).unwrap();
      setOpen(true);
    } finally {
      formMethods.reset(defaultFormValues);
    }
  };

  return { isOpen, setOpen, responseData, formMethods, createCar };
};
