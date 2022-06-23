import styles from '../styles/Footer.module.css';
import React from "react";
import Image from 'next/image'
import simba from '../public/simba.jpeg';



export const Sfooter= () => {
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.footerLeft}>
                    Клуб любителей кошек Симба
                    <div className={styles.footerText}>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                    </div>
                </div>
                <div className={styles.footerCenter}>
                    Документация
                    <div className={styles.footerText}>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                    </div>
                </div>
                <div className={styles.footerRight}>
                    Информация
                    <div className={styles.footerText}>
                        {/*<div className={styles.footerLogo}></div><Image src={simba}></Image>*/}
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                    </div>
                </div>
            </div>
            <div className={styles.footerDown}>
               <div>
                   <a href="/">главная</a>
               </div>
               <div><a href="/cats">cats</a></div>
            </div>
        </>
    )
};
