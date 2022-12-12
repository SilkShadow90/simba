import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { Strings } from '../resources';
import simba from '../public/simba.jpeg';


export const Footer= () => {
    return (
      <div className={styles.footer}>
          <div className={styles.footerColumn}>
              {Strings.footer.leftColumn.title}
              <div className={styles.footerTextContainer}>
                  <div className={styles.inline}>
                      <li className={styles.footerText}>
                          <Link href="/">
                             {Strings.footer.leftColumn.main}
                          </Link>
                      </li>
                      <li className={styles.footerText}>
                          <Link href="/docs">
                             {Strings.footer.leftColumn.docs}
                          </Link>
                      </li>
                      <li className={styles.footerText}>
                          <Link href="/cats">
                            {Strings.footer.leftColumn.cats}
                          </Link>
                      </li>
                      <li className={styles.footerText}>
                          <Link href="/exhibition">
                              {Strings.footer.leftColumn.Exhibitions}
                          </Link>
                      </li>
                      <li className={styles.footerText}>
                          <Link href="/nurseries">
                              {Strings.footer.leftColumn.Nurseries}
                          </Link>
                      </li>
                      <li className={styles.footerText}>
                          <Link href="/contacts">
                              {Strings.footer.leftColumn.Contacts}
                          </Link>
                      </li>
                  </div>
              </div>
          </div>
          <div className={styles.footerColumn}>
              {Strings.footer.centerColumn.title}
              <div className={styles.footerTextContainer}>
                  <div className={styles.inline}>
                      <li className={styles.footerText}>
                          <Link href="/docs">{Strings.footer.centerColumn.docsOne}</Link></li>
                      <li className={styles.footerText}>
                          <Link href="/docs">{Strings.footer.centerColumn.docsTwo}</Link></li>
                      <li className={styles.footerText}>
                          <Link href="/docs">{Strings.footer.centerColumn.docsTree}</Link></li>
                      <li className={styles.footerText}>
                          <Link href="/docs">{Strings.footer.centerColumn.docsFour}</Link></li>
                  </div>
                  <li className={styles.footerText}>
                      <Link href="/docs">{Strings.footer.centerColumn.docsFive}</Link></li>
              </div>
          </div>
          <div className={styles.footerColumn}>
              {Strings.footer.rightColumn.title}
              <div className={styles.footerTextContainer}>
                  <div className={styles.inline}>
                      <li className={styles.footerText}>&#8226; <span>{Strings.footer.rightColumn.phoneOne}</span></li>
                      <li className={styles.footerText}>&#8226; <span>{Strings.footer.rightColumn.phoneTwo}</span></li>
                      <li className={styles.footerText}>&#8226; <span>{Strings.footer.rightColumn.email}</span></li>
                  </div>
              </div>
          </div>
      </div>
    );
};
