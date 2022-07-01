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
                        <li><a href="/">Главная</a></li>
                        <li><a href="/docs">Документы</a></li>
                        <li><a href="/cats">Кошки</a></li>
                        <li>Выставки</li>
                        <li>Питомники</li>
                        <li>Контакты</li>
                    </div>
                </div>
                <div className={styles.footerCenter}>
                    Документация
                    <div className={styles.footerText}>
                        <li>Племенное положение</li>
                        <li>Заявление на вступление в клуб</li>
                        <li>Заявление на титул</li>
                        <li>Регистрация питомника</li>
                        <li>Направление на вязку</li>
                    </div>
                </div>
                <div className={styles.footerRight}>
                    Информация
                    <div className={styles.footerText}>
                        {/*<div className={styles.footerLogo}></div><Image src={simba}></Image>*/}
                        <li>тел. 8 999 987 65 53</li>
                        <li>тел. 8 999 987 65 53</li>
                        <li>email: catsmobile@mail.ru</li>
                    </div>
                </div>
            </div>
            {/*<div className={styles.footerDown}>*/}
            {/*   <div>*/}
            {/*       <a href="/">главная</a>*/}
            {/*   </div>*/}
            {/*   <div><a href="/cats">cats</a></div>*/}
            {/*</div>*/}
        </>
    )
};
