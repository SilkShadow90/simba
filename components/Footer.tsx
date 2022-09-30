import styles from '../styles/Footer.module.css';
import React from "react";
import { Strings } from '../resources';
import Image from 'next/image'
import simba from '../public/simba.jpeg';
import Link from 'next/link';


export const Footer= () => {
    return (
      <div className={styles.footer}>
          <div className={styles.footerColumn}>
              {Strings.footer.leftColumn.title}
              <div className={styles.footerTextContainer}>
                  <div className={styles.inline}>
                      <li className={styles.footerText}>&#8226; <Link href="/"><span>{Strings.footer.leftColumn.main}</span></Link></li>
                      <li className={styles.footerText}>&#8226; <Link href="/docs"><span>{Strings.footer.leftColumn.docs}</span></Link></li>
                      <li className={styles.footerText}>&#8226; <Link href="/cats"><span>{Strings.footer.leftColumn.cats}</span></Link></li>
                      <li className={styles.footerText}>&#8226; <span>{Strings.footer.leftColumn.Exhibitions}</span></li>
                      <li className={styles.footerText}>&#8226; <span>{Strings.footer.leftColumn.Nurseries}</span></li>
                      <li className={styles.footerText}>&#8226; <Link href="/contacts"><span>{Strings.footer.leftColumn.Contacts}</span></Link></li>
                  </div>
              </div>
          </div>
          <div className={styles.footerColumn}>
              {Strings.footer.centerColumn.title}
              <div className={styles.footerTextContainer}>
                  <div className={styles.inline}>
                      <li className={styles.footerText}>&#8226; <span>{Strings.footer.centerColumn.docsOne}</span></li>
                      <li className={styles.footerText}>&#8226; <span>{Strings.footer.centerColumn.docsTwo}</span></li>
                      <li className={styles.footerText}>&#8226; <span>{Strings.footer.centerColumn.docsTree}</span></li>
                      <li className={styles.footerText}>&#8226; <span>{Strings.footer.centerColumn.docsFour}</span></li>
                      <li className={styles.footerText}>&#8226; <span>{Strings.footer.centerColumn.docsFive}</span></li>
                  </div>
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
    )
};
