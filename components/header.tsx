import styles from '../styles/Header.module.css';
import React from "react";
import Image from 'next/image'


export const Header= () => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.headerText}>
                        <a href="/">Главная</a>
                    </div>
                    <div className={styles.headerText}>
                        <a href="/docs">Документы</a>
                    </div>
                    <div className={styles.headerText}>
                        <a href="/cats">Кошки</a>
                    </div>
                    <div className={styles.headerText}>
                        Выставки
                    </div>
                    <div className={styles.headerText}>
                        Питомники
                    </div>
                    <div className={styles.headerText}>
                        Контакты
                    </div>
                </div>
                {/*<Image className={styles.headerLogo} src={simba}/>*/}
            </div>
        </>
    )
};