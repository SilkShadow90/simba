import React, { PropsWithChildren } from 'react';
import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames';
import styles from '../../styles/adminStyles/Admin.module.css';

interface Props {
  short: boolean;
  text: string;
  isActive: boolean;
  srcActive: StaticImageData;
  srcNoActive: StaticImageData;
  onClick(): void
}

export const AdminTab = React.memo(({ text, isActive, srcActive, srcNoActive, short, onClick }: PropsWithChildren<Props>) => {
  return (
    <button onClick={onClick} className={styles.adminCardsLeft_input_position}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        className={styles.adminCardsLeft_input_position_img}
        objectFit={'cover'}
        src={isActive ? srcActive : srcNoActive}
      />
      <div
        className={classNames(
          styles.tabText,
          isActive ? styles.adminCardsLeftColumnRed : styles.adminCardsLeftColumn,
          short && styles.tabTextHide,
        )}
      >
        {text}
      </div>
    </button>
  );
});

AdminTab.displayName = 'AdminTab';
