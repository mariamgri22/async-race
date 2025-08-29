import { useSelector } from '@/app/redux/hooks';
import { CarID, selectCar } from '@/etities/Car';
import PlayIcon from '@/shared/assets/icons/play.svg?react';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';

import { useStartDriveEngine } from '../hooks/useStartDriveEngine';

type Props = {
  carID: CarID;
  className?: string;
};

export const EngineDrive = ({ carID, className }: Props) => {
  const car = useSelector(selectCar.car(carID));
  const { startDriveEngine, isLoading } = useStartDriveEngine({ carID });

  return (
    <Button
      kit={ButtonKits.PRYMARY_S_YELLOW}
      onClick={startDriveEngine}
      disabled={!!car?.drive || isLoading}
      className={className}
    >
      <PlayIcon />
    </Button>
  );
};
