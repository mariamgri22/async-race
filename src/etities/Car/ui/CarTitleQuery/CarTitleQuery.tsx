import { carAPI } from '../../api/backend';
import { CarID } from '../../types/types';

type Props = {
  carID: CarID;
};

export const CarTitleQuery = ({ carID }: Props) => {
  // 0. Init
  const { data: car } = carAPI.useGetCarQuery(carID);

  // Render
  if (!car) return null;
  return <p>{car?.name}</p>;
};
