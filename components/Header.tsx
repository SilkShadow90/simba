import React, { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Image from 'next/image';
import styles from '../styles/Header.module.css';
import { navigationList } from '../utils/navigation';
import simba from '../public/simba.jpeg';
import menu from '../public/menu.svg';
import close from '../public/adminImg/other/close.svg';
import { Portal } from './Portal';
import { Flex } from './UIKit/Flex';
import { TextBlock } from './UIKit/TextBlock';

export const Header = () => {
  const route = useRouter();
  const activeUrl = route.pathname.split('/')?.[1] || '';

  const [isOpenMenu, setOpenMenu] = useState(false);

  const menuToggle = useCallback(() => {
    setOpenMenu(prevState => !prevState);
  }, []);

  const navItem = useMemo(() => navigationList.find(nav => nav.link === activeUrl), [activeUrl]);

  return (
    <>
      <div className={styles.headerWrapperSeparator} />
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <div className={styles.logo}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={simba} layout={'fill'} objectFit={'contain'} />
          </div>
          <div className={styles.headerMobile}>
            {!isOpenMenu ? (
              <button className={styles.menu} onClick={menuToggle}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image src={menu} layout={'fill'} objectFit={'contain'} />
              </button>
            ) : (
              <div className={styles.menu} />
            )}
            <TextBlock type="Caption" color="alternative">
              {navItem?.link ? navItem.text : 'КЛК Симба'}
            </TextBlock>
          </div>
          <div className={styles.navList}>
            {navigationList.map(nav => (
              <div key={nav.link}
                   className={classNames(styles.headerText, activeUrl === nav.link && styles.headerTextActive)}>
                <Link href={`/${nav.link}`}>{nav.text}</Link>
              </div>
            ))}
          </div>
          <Portal isVisible={isOpenMenu}>
            <Flex flexDirection="column" styleProps={styles.navListMobile}>
              <button className={styles.menuMobile} onClick={menuToggle}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image src={close} layout={'fill'} objectFit={'contain'} />
              </button>
              {navigationList.map(nav => (
                <div key={nav.link}
                     className={classNames(styles.headerText, activeUrl === nav.link && styles.headerTextActive)}>
                  <Link href={`/${nav.link}`}>{nav.text}</Link>
                </div>
              ))}
            </Flex>
          </Portal>
        </div>
      </div>
    </>
  );
};
