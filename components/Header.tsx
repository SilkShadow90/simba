import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Strings } from '../resources';
import styles from '../styles/Header.module.css';


export const Header= () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <div className={styles.headerText}>
                    <Link href="/">{Strings.footer.leftColumn.main}</Link>
                </div>
                <div className={styles.headerText}>
                    <Link href="/docs">{Strings.footer.leftColumn.docs}</Link>
                </div>
                <div className={styles.headerText}>
                    <Link href="/cats">{Strings.footer.leftColumn.cats}</Link>
                </div>
                <div className={styles.headerText}>
                    <Link href="/exhibition">{Strings.footer.leftColumn.Exhibitions}</Link>
                </div>
                <div className={styles.headerText}>
                    {Strings.footer.leftColumn.Nurseries}
                </div>
                <div className={styles.headerText}>
                    <Link href="/contacts">{Strings.footer.leftColumn.Contacts}</Link>
                </div>
                <div className={styles.headerText}>
                    <Link href="/partners">{Strings.footer.leftColumn.partners}</Link>
                </div>
            </div>
            {/* <Image className={styles.headerLogo} src={simba}/> */}
        </div>
    );
};
