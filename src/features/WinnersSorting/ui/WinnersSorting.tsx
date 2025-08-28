import { useState } from 'react';

import { useDispatch } from '@/app/redux/hooks';
import { WinnersOrder, WinnersParams, WinnersSort, winnerActions } from '@/etities/Winner';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';

type Props = {
  btnText: string;
  sortBy: WinnersSort;
};

export const WinnersSorting = ({ btnText, sortBy }: Props) => {
  // 0. Init

  const dispatch = useDispatch();
  const [order, setOrder] = useState<WinnersOrder>(WinnersOrder.ASC);

  // 1. Actions

  function mutateQuery() {
    dispatch(
      winnerActions.mutateWinnersQueryParams({
        [WinnersParams.SORT]: sortBy,
        [WinnersParams.ORDER]: order,
      })
    );
    setOrder(order === WinnersOrder.ASC ? WinnersOrder.DESC : WinnersOrder.ASC);
  }

  // 2. Render

  return (
    <Button kit={ButtonKits.TABLE_M_YELLOW} onClick={mutateQuery}>
      {btnText}
    </Button>
  );
};
