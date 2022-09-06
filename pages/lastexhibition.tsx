import type { NextPage } from 'next'
import styles from '../styles/Lastexhibition.module.css'
import React from 'react';
import {Page} from "../components/Page";
import ExhibitionCard from "../components/Intro/ExhibitionCard";


const lastexhibition: NextPage = () => {
    return (
        <Page title="Прошедшие выставки" meta="bla bla" styles={styles.container}>
            <div>
                <div className={styles.lasthibition}>Прошедшие выставки</div>
                <div className={styles.exhibition_Main}>
                    <ExhibitionCard
                        title={'Выставка кошек 10-11 октября 2020'}
                        text={'10-11 октября 2020 г, прошла Международная выставка кошек РФОО Коргоруши, Москва'}
                        css={styles.exhibition_Main__card}
                        csstwo={styles.lasthibition_srcone}
                        link={''}
                    />
                    <ExhibitionCard
                        title={'Выставка кошек 25-26 января 2020 г.'}
                        text={'25-26 января 2020г, прошла Международная выставка кошек памяти Людмилы Есиной, РФОО Коргоруши, Москва, парк Сокольники'}
                        css={styles.exhibition_Main__card}
                        csstwo={styles.lasthibition_srctwo}
                        link={''}
                    />
                    <ExhibitionCard
                        title={'Выставка кошек 05-06 октября 2019'}
                        text={'05-06 октября 2019 г, прошла Международная выставка кошек РФОО Коргоруши, Москва'}
                        css={styles.exhibition_Main__card}
                        csstwo={styles.lasthibition_srcthree}
                        link={''}
                    />
                </div>
            </div>
        </Page>
    )
}
export default lastexhibition