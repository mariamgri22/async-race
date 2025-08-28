import { useSelector } from 'react-redux';

import { selectCar } from '@/etities/Car';
import PlayIcon from '@/shared/assets/icons/play.svg?react';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';

import { useStartDriveEngineList } from '../hooks/useStartDriveEngineList';

type Props = {
  className?: string;
};

export const CarsRace = ({ className }: Props) => {
  // 0. Config

  const carIDs = useSelector(selectCar.carIDs) || [];
  const isAnyInDrive = useSelector(selectCar.isAnyInDrive);
  const { startDriveEngineList, isLoading } = useStartDriveEngineList({ carIDs });

  // Render

  return (
    <Button
      kit={ButtonKits.PRYMARY_M_GREEN}
      onClick={startDriveEngineList}
      className={className}
      disabled={isLoading || isAnyInDrive}
    >
      <span>RACE</span>
      <PlayIcon />
    </Button>
  );
};
