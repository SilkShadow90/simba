import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Image from 'next/image';
import styles from '../styles/Header.module.css';
import { navigationList } from '../utils/navigation';
import simba from '../public/simba.jpeg';

export const Header = () => {
  const route = useRouter();
  const activeUrl = route.pathname.split('/')?.[1] || '';

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={simba} layout={'fill'} objectFit={'contain'} />
        </div>
        {navigationList.map(nav => (
          <div key={nav.link}
               className={classNames(styles.headerText, activeUrl === nav.link && styles.headerTextActive)}>
            <Link href={`/${nav.link}`}>{nav.text}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
