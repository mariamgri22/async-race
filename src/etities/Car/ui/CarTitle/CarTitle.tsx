import { EngineDriveMode } from '@/etities/Engine';
import CheckEngineIcon from '@/shared/assets/icons/check-engine.svg?react';
import DiscIcon from '@/shared/assets/icons/disc.svg?react';
import { ColorHEXString } from '@/shared/types/types';

import styles from './CarTitle.module.scss';

type Props = {
  color: ColorHEXString;
  title: string;
  driveMode?: EngineDriveMode | null;
};

export const CarTitle = ({ color, title, driveMode }: Props) => {
  function renderDriveModeStatus() {
    if (driveMode === EngineDriveMode.DRIVE) {
      return (
        <div className={styles['green-light']}>
          <DiscIcon className={styles['green-light__icon']} />
        </div>
      );
    }
    if (driveMode === EngineDriveMode.BROKEN) {
      return (
        <div className={styles['check-engine']}>
          <CheckEngineIcon className={styles['check-engine__icon']} />
        </div>
      );
    }
    return null;
  }

  // Render

  return (
    <div className={styles.container}>
      {renderDriveModeStatus()}
      <span className={styles.title} style={{ color }}>
        {title.toUpperCase()}
      </span>
    </div>
  );
};
