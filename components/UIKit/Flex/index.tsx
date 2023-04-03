import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

type Props = {
  flex?: string
  centered?: boolean
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  styleProps?: string;
  padding?: string
}

export const Flex = ({ children, flex = '1 1 auto', centered, flexDirection = 'row', padding, styleProps }: PropsWithChildren<Props>) => {
  return (
    <div
      className={classNames(
        styles.flex,
        centered && styles.centered,
        styleProps && styleProps,
      )}
      style={{ flexDirection, flex, padding }}
    >
      {children}
    </div>
  );
};
