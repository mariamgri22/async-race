import { carAPI } from '@/etities/Car';
import { CarID } from '@/etities/Car/types/types';
import { winnerAPI } from '@/etities/Winner';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';

type Props = {
  carID: CarID;
  className?: string;
};

export const CarDelete = ({ carID, className }: Props) => {
  // 0. Init
  const [deleteCar, {}] = carAPI.useDeleteCarMutation();
  const [deleteWinner, {}] = winnerAPI.useDeleteWinnerMutation();

  // 1. Actions
  function handleDeleteCar() {
    deleteCar({ id: carID })
      .unwrap()
      .then(() => deleteWinner({ id: carID }))
      .catch(console.log);
  }

  // Render
  return (
    <Button kit={ButtonKits.PRYMARY_S_PURPLE} onClick={handleDeleteCar} className={className}>
      REMOVE
    </Button>
  );
};
