import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from '../styles/List.module.css';

type Props = PropsWithChildren & {
  className?: string
}

export const List = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.container, className)}>
      {children}
    </div>
  );
};
