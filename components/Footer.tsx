import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from '../styles/Footer.module.css';
import { Strings } from '../resources';
import { navigationList } from '../utils/navigation';
import { useFetchService } from '../utils/useFetchService';
import InfoMethods from '../api/InfoMethods';


export const Footer = () => {
  const { data: info } = useFetchService(InfoMethods.getData);

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footer}>
        <div className={classNames(styles.footerColumn, styles.startColumn, styles.footerNav)}>
          {Strings.footer.leftColumn.title}
          <div className={styles.footerTextContainer}>
            {navigationList.filter(nav => nav.link && nav.link !== 'docs' && nav.link !== 'contacts')
              .map(nav => (
                <div className={styles.inline} key={nav.link}>
                  &#8226; <Link href={`/${nav.link}`}>
                    {nav.text}
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.separator} />
        <div className={classNames(styles.footerColumn, styles.footerDocs)}>
          {Strings.footer.centerColumn.title}
          <div className={styles.footerTextContainer}>
              {Strings.footer.centerColumn.docs.map((doc) => (
                <div className={styles.inline} key={doc}>
                  &#8226; <Link href="/docs">{doc}</Link>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.separator} />
        <div className={styles.footerColumn}>
          {Strings.footer.rightColumn.title}
          <div className={styles.footerTextContainer}>
              {!!info && (
                <>
                  {info.contacts.tel.map((v) => (
                    <div className={styles.inline} key={v}>
                      &#8226; <a className={styles.footerText}>
                        <span>тел: {v}</span>
                      </a>
                    </div>
                  ))}
                  <div className={styles.inline}>
                    &#8226; <a className={styles.footerText}>
                      <span>{info.contacts.email}</span>
                    </a>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
