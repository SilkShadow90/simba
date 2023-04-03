import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

type Props = {
  type?: 'H1' | 'H2' | 'H3' | 'Caption' | 'Body' | 'Small' | 'Link'
  color?: 'primary' | 'alternative'
  centered?: boolean
  styleProps?: string
}

export const TextBlock = ({ children, type = 'Body', color = 'primary', centered, styleProps }: PropsWithChildren<Props>) => {
  if (type === 'H1') {
    return (
      <h1
        className={classNames(
          styles.h1,
          centered && styles.centered,
          styleProps && styleProps,
          color === 'primary' ? styles.primary : styles.alternative
        )}
      >
        {children}
      </h1>
    );
  }

  if (type === 'H2') {
    return (
      <h2
        className={classNames(
          styles.h2,
          centered && styles.centered,
          styleProps && styleProps,
          color === 'primary' ? styles.primary : styles.alternative
        )}
      >
        {children}
      </h2>
    );
  }
  if (type === 'H3') {
    return (
      <h3
        className={classNames(
          styles.h3,
          centered && styles.centered,
          styleProps && styleProps,
          color === 'primary' ? styles.primary : styles.alternative
        )}
      >
        {children}
      </h3>
    );
  }

  return (
    <span
      className={classNames(
        type === 'Body' && styles.body,
        type === 'Caption' && styles.caption,
        type === 'Small' && styles.small,
        color === 'primary' ? styles.primary : styles.alternative,
        type === 'Link' && styles.link,
        centered && styles.centered,
        styleProps && styleProps,
      )}
    >
      {children}
    </span>
  );
};
