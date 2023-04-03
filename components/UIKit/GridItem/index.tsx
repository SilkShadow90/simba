import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

type Props = {
  styleProps?: string;
  gridArea?: string
}

export const GridItem = ({ children,gridArea, styleProps }: PropsWithChildren<Props>) => {
  return (
    <div
      className={classNames(
        styles.gridItem,
        styleProps && styleProps,
      )}
      style={{ gridArea }}
    >
      {children}
    </div>
  );
};
