import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

type Props = {
  styleProps?: string;
  stretch?: boolean;
  marginVertical?: number;
}

export const ScreenLayout = ({ children, styleProps, stretch, marginVertical }: PropsWithChildren<Props>) => {
  return (
    <div
      className={classNames(
        styles.screen,
        styleProps && styleProps,
        stretch && styles.stretch,
      )}
      style={marginVertical !== undefined && { marginBottom: `${marginVertical}px`, marginTop: `${marginVertical}px` } || {}}
    >
      {children}
    </div>
  );
};
