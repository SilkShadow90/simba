import styles from '../styles/Footer.module.css';
import React from "react";
import { Strings } from '../resources';
import Image from 'next/image'
import simba from '../public/simba.jpeg';
import Link from 'next/link';


export const Footer= () => {
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.footerLeft}>
                    {Strings.footer.leftColumn.title}
                    <div className={styles.footerText}>
                        <div className={styles.inline}>
                            <li className={styles.footerTextHover}><Link href="/">{Strings.footer.leftColumn.main}</Link></li>
                            <li className={styles.footerTextHover}><Link href="/docs">{Strings.footer.leftColumn.docs}</Link></li>
                            <li className={styles.footerTextHover}><Link href="/cats">{Strings.footer.leftColumn.cats}</Link></li>
                            <li className={styles.footerTextHover}>{Strings.footer.leftColumn.Exhibitions}</li>
                            <li className={styles.footerTextHover}>{Strings.footer.leftColumn.Nurseries}</li>
                            <li className={styles.footerTextHover}><Link href="/contacts">{Strings.footer.leftColumn.Contacts}</Link></li>
                        </div>
                    </div>
                </div>
                <div className={styles.footerCenter}>
                    {Strings.footer.centerColumn.title}
                    <div className={styles.footerText}>
                        <div className={styles.inline}>
                            <li className={styles.footerTextHover}>{Strings.footer.centerColumn.docsOne}</li>
                            <li className={styles.footerTextHover}>{Strings.footer.centerColumn.docsTwo}</li>
                            <li className={styles.footerTextHover}>{Strings.footer.centerColumn.docsTree}</li>
                            <li className={styles.footerTextHover}>{Strings.footer.centerColumn.docsFour}</li>
                            <li className={styles.footerTextHover}>{Strings.footer.centerColumn.docsFive}</li>
                        </div>
                    </div>
                </div>
                <div className={styles.footerRight}>
                    {Strings.footer.rightColumn.title}
                    <div className={styles.footerText}>
                        <div className={styles.inline}>
                            <li className={styles.footerTextHover}>{Strings.footer.rightColumn.phoneOne}</li>
                            <li className={styles.footerTextHover}>{Strings.footer.rightColumn.phoneTwo}</li>
                            <li className={styles.footerTextHover}>{Strings.footer.rightColumn.email}</li>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};
