import type { NextPage } from 'next'
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/come.module.css';
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import stars from "../public/stars.jpg";

const come: NextPage = () => {
    return (
        <Page title="Ближайщие выставки" meta="bla bla" styles={styles.container} >
            <div className={styles.exhibition_Main}>
                <div className={styles.comeinfo}>
                    <div>Выставка кошек 10-11 октября 2020</div>
                </div>
                <div className={styles.comeinfo_title}>
                    10-11 октября 2020 г, прошла Международная выставка кошек РФОО Коргоруши, Москва
                </div>
                <div className={styles.comearbiter}>
                    <div className={styles.comeinfo}>Судьи</div>
                    <div className={styles.comearbiter_info}>
                        <ExhibitionCard
                            title={'Иван Петрович Затравкин'}
                            text={'Кот Лезвие'}
                            csssrc={styles.come_src_winner_one}
                            image={stars}
                            link={''}
                        />
                        <ExhibitionCard
                            title={'Виктор Алексеев Лосев'}
                            text={'Кот Бритва'}
                            csssrc={styles.come_src_winner_one}
                            image={stars}
                            link={''}
                        />
                        <ExhibitionCard
                            title={'Михеев Лука Илларионович'}
                            text={'Кот Борис'}
                            csssrc={styles.come_src_winner_one}
                            image={stars}
                            link={''}
                        />
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default come;
