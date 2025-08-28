import { useDispatch, useSelector } from '@/app/redux/hooks';
import { WinnersParams, selectWinner, winnerAPI, winnerActions } from '@/etities/Winner';
import { Pagination } from '@/features/Pagination';
import { Total } from '@/shared/ui/Total/Total';

import styles from './WinnersBottomControls.module.scss';

type Props = object;

export const WinnersBottomControls = ({}: Props) => {
  // 0. Init

  const dispatch = useDispatch();
  const params = useSelector(selectWinner.winnersQueryParams);
  const { data } = winnerAPI.useGetWinnersQuery(params);
  const currentPage = params[WinnersParams.PAGE];
  const limit = params[WinnersParams.LIMIT];
  const totalCount = data?.totalCount;

  // 1. Render

  return (
    <section className={styles.section}>
      <Total entity="Records" total={totalCount || 0} />
      <Pagination
        currentPage={currentPage || 1}
        limit={limit || 1}
        totalCount={totalCount || 1}
        scrollPage={(page: number) =>
          dispatch(winnerActions.mutateWinnersQueryParams({ [WinnersParams.PAGE]: page }))
        }
      />
    </section>
  );
};
