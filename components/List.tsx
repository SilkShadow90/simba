import React, { PropsWithChildren } from 'react';
import styles from '../styles/List.module.css';
import classNames from 'classnames';

type Props = PropsWithChildren & {
  className?: string
}

export const List = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.container, className)}>
      {children}
    </div>
  )
}
