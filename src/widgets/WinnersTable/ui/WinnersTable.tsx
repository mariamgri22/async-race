import clsx from 'clsx';
import { useEffect } from 'react';

import { useSelector } from '@/app/redux/hooks';
import { CarBodyQuery, CarTitleQuery } from '@/etities/Car';
import { WinnersSort, selectWinner, winnerAPI } from '@/etities/Winner';
import { WinnersSorting } from '@/features/WinnersSorting';

import styles from './WinnersTable.module.scss';

type Props = object;

export const WinnersTable = ({}: Props) => {
  // 0. Init

  const params = useSelector(selectWinner.winnersQueryParams);
  const { data, isError } = winnerAPI.useGetWinnersQuery(params);
  const winners = data?.data;

  useEffect(() => {
    if (isError)
      throw new Error(
        'Error while fetching winners | check if the mock server is running, see Readme.md.'
      );
  }, [isError]);

  // 1. Render

  if (!winners) return <p>Loading...</p>;

  return (
    <section className={styles.winners}>
      <div className={clsx(styles.winners__row, styles.winners__row_type_header)}>
        <WinnersSorting btnText={'№'} sortBy={WinnersSort.ID} />
        <p>CAR</p>
        <p>NAME</p>
        <WinnersSorting btnText={'WINS'} sortBy={WinnersSort.WINS} />
        <WinnersSorting btnText={'BEST TIME'} sortBy={WinnersSort.TIME} />
      </div>

      {winners?.map((winner) => {
        return (
          <div key={winner.id} className={styles.winners__row}>
            <p>{winner.id}</p>
            <CarBodyQuery carID={winner.id} />
            <CarTitleQuery carID={winner.id} />
            <p>{winner.wins}</p>
            <p>{winner.time}</p>
          </div>
        );
      })}
    </section>
  );
};
