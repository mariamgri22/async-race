import { useSelector } from '@/app/redux/hooks';
import { selectCar } from '@/etities/Car';
import ResetIcon from '@/shared/assets/icons/reset.svg?react';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';

import { useStopEngineList } from '../hooks/useStopEngineList';

type Props = {
  className?: string;
};

export const CarsReset = ({ className }: Props) => {
  // 0. Config

  const carIDs = useSelector(selectCar.carIDs) || [];
  const isAnyInDrive = useSelector(selectCar.isAnyInDrive);
  const { stopEngineList, isLoading } = useStopEngineList({ carIDs });

  // Render

  return (
    <Button
      kit={ButtonKits.PRYMARY_M_PURPLE}
      onClick={stopEngineList}
      className={className}
      disabled={isLoading || !isAnyInDrive}
    >
      <span>RESET</span>
      <ResetIcon />
    </Button>
  );
};
