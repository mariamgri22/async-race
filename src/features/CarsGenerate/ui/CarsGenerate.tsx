import { faker } from '@faker-js/faker';

import { CarRequest, carAPI } from '@/etities/Car';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';

type Props = {
  className?: string;
};

export const CarsGenerate = ({ className }: Props) => {
  // 0. Config
  const NUMBER_OF_CARS = 100;
  const [postCar] = carAPI.usePostCarMutation();

  // 1. Actions

  function generateCars() {
    for (let i = 0; i < NUMBER_OF_CARS; i++) {
      const car: CarRequest = {
        name: `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
        color: faker.internet.color(),
      };
      postCar(car);
    }
  }

  // Render

  return (
    <Button kit={ButtonKits.PRYMARY_M_GREEN} onClick={generateCars} className={className}>
      <span>GENERATE CARS</span>
    </Button>
  );
};
