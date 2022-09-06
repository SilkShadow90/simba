import styles from '../styles/Header.module.css';
import React from "react";
import { Strings } from '../resources';
import Image from 'next/image'


export const Header= () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <div className={styles.headerText}>
                    <a href="/">{Strings.footer.leftColumn.main}</a>
                </div>
                <div className={styles.headerText}>
                    <a href="/docs">{Strings.footer.leftColumn.docs}</a>
                </div>
                <div className={styles.headerText}>
                    <a href="/cats">{Strings.footer.leftColumn.cats}</a>
                </div>
                <div className={styles.headerText}>
                    <a href="/exhibition">{Strings.footer.leftColumn.Exhibitions}</a>
                </div>
                <div className={styles.headerText}>
                    {Strings.footer.leftColumn.Nurseries}
                </div>
                <div className={styles.headerText}>
                    <a href="/contacts">{Strings.footer.leftColumn.Contacts}</a>
                </div>
            </div>
            {/*<Image className={styles.headerLogo} src={simba}/>*/}
        </div>
    )
};
