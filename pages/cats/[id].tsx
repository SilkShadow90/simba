import type { NextPage } from 'next';
import React from 'react';
import Image from "next/image";
import { Page } from '../../components/Page';
import styles from '../../styles/Partners.module.css';
import cattwo from "../../public/cattwo.jpg";



const id: NextPage = () => {
    return (
        <Page title="Профиль кошки" meta="bla bla" styles={styles.container} >
            <div className={styles.partners_Main}>
                <h3>Имя питомца</h3>
                <div className={styles.partners_logo}>
                    <div className={styles.partners_logos}>
                        <Image className={styles.partners_logotype} src={cattwo} objectFit={"cover"}/>
                    </div>
                    <div className={styles.partners_info_Main}>
                        <div className={styles.partners_info}>контакты</div>
                        <div className={styles.partners_info}>контакты</div>
                        <div className={styles.partners_info}>контакты</div>
                        <div className={styles.partners_info}>http://goldenpride.ulsimba.ru/</div>
                        <div className={styles.partners_info}>контакты
                        </div>
                        <div> контакты
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default id;