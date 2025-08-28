import React from 'react';

import styles from './Signborder.module.scss';

type Props = {
  text: string;
  style?: React.CSSProperties;
};

export const Signborder = ({ text, style }: Props) => {
  return (
    <div className={styles.signborder} style={style}>
      <p className={styles.signborder__text}>{text}</p>
    </div>
  );
};
