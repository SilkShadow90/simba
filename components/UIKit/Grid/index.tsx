import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

type Props = {
  styleProps?: string;
  gridTemplateColumns?: string
  gridTemplateAreas?: string
  gridTemplateRows?: string
}

export const Grid = ({ children, gridTemplateColumns, gridTemplateAreas, gridTemplateRows, styleProps }: PropsWithChildren<Props>) => {
  return (
    <div
      className={classNames(
        styles.grid,
        styleProps && styleProps,
      )}
      style={{ gridTemplateColumns, gridTemplateAreas, gridTemplateRows }}
    >
      {children}
    </div>
  );
};
