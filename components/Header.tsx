import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from '../styles/Header.module.css';
import { navigationList } from '../utils/navigation';


export const Header= () => {
    const route = useRouter();
    const activeUrl = route.pathname.split('/')?.[1] || '';

    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                {navigationList.map(nav => (
                  <div key={nav.link} className={classNames(styles.headerText, activeUrl === nav.link && styles.headerTextActive)}>
                      <Link href={`/${nav.link}`}>{nav.text}</Link>
                  </div>
                ))}
            </div>
        </div>
    );
};
