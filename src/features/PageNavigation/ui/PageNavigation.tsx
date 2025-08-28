import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import routes from '@/app/constants/routes';

import styles from './PageNavigation.module.scss';

type Props = object;

export const PageNavigation = ({}: Props) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li>
          <NavLink
            className={({ isActive }) => clsx(styles.link, { [styles.link_active]: isActive })}
            to={routes.garage}
          >
            GARAGE
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx(styles.link, { [styles.link_active]: isActive })}
            to={routes.winners}
          >
            WINNERS
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
