import styles from '../styles/Footer.module.css';
import React from "react";
import Image from 'next/image'
import simba from '../public/simba.jpeg';



export const Footer= () => {
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.footerLeft}>
                    Клуб любителей кошек Симба
                    <div className={styles.footerText}>
                        <li className={styles.footerTextHover}><a href="/">Главная</a></li>
                        <li className={styles.footerTextHover}><a href="/docs">Документы</a></li>
                        <li className={styles.footerTextHover}><a href="/cats">Кошки</a></li>
                        <li className={styles.footerTextHover}>Выставки</li>
                        <li className={styles.footerTextHover}>Питомники</li>
                        <li className={styles.footerTextHover}>Контакты</li>
                    </div>
                </div>
                <div className={styles.footerCenter}>
                    Документация
                    <div className={styles.footerText}>
                        <li className={styles.footerTextHover}>Племенное положение</li>
                        <li className={styles.footerTextHover}>Заявление на вступление в клуб</li>
                        <li className={styles.footerTextHover}>Заявление на титул</li>
                        <li className={styles.footerTextHover}>Регистрация питомника</li>
                        <li className={styles.footerTextHover}>Направление на вязку</li>
                    </div>
                </div>
                <div className={styles.footerRight}>
                    Информация
                    <div className={styles.footerText}>
                        <li className={styles.footerTextHover}>тел. 8 999 987 65 53</li>
                        <li className={styles.footerTextHover}>тел. 8 999 987 65 53</li>
                        <li className={styles.footerTextHover}>email: catsmobile@mail.ru</li>
                    </div>
                </div>
            </div>

        </>
    )
};
