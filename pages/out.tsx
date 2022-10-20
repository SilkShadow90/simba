import type { NextPage } from 'next'
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/out.module.css';
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import Image from "next/image";

function jpeg(size: number = 150) {
    return `https://source.unsplash.com/random/${size}`
}

function getImages(length: number, size: number = 150) {
    return new Array(length).fill(null).map((_, index) => (
        <Image loader={() => jpeg(size)} src={jpeg(size)} key={index} width={`${size}px`} height={`${size}px`} objectFit={'none'}/>
    ))
}


const out: NextPage = () => {
    return (
        <Page title="Прошедшие выставки" meta="bla bla" styles={styles.container} >
            <div className={styles.exhibition_Main}>
                <div className={styles.outinfo}>
                    <div>Выставка кошек 10-11 октября 2020</div>
                </div>
                <div className={styles.outinfo_title}>
                    10-11 октября 2020 г, прошла Международная выставка кошек РФОО Коргоруши, Москва
                </div>
                <div className={styles.outwinner}>
                    <div className={styles.outinfo}>Победители</div>
                    <div className={styles.outwinner_dinner}>
                        <ExhibitionCard
                            title={'Иван Петрович Затравкин'}
                            text={'Кот Лезвие'}
                            csssrc={styles.out_src_winner_one}
                            link={''}
                        />
                        <ExhibitionCard
                            title={'Виктор Алексеев Лосев'}
                            text={'Кот Бритва'}
                            csssrc={styles.out_src_winner_one}
                            link={''}
                        />
                        <ExhibitionCard
                            title={'Михеев Лука Илларионович'}
                            text={'Кот Борис'}
                            csssrc={styles.out_src_winner_one}
                            link={''}
                        />
                    </div>
                </div>
                <div className={styles.outarbiter}>
                    <div className={styles.outinfo}>Судьи</div>
                    <div className={styles.outarbiter_info}>
                        <ExhibitionCard
                            title={'Иван Петрович Затравкин'}
                            text={'Кот Лезвие'}
                            csssrc={styles.out_src_winner_one}
                            link={''}
                        />
                        <ExhibitionCard
                            title={'Виктор Алексеев Лосев'}
                            text={'Кот Бритва'}
                            csssrc={styles.out_src_winner_one}
                            link={''}
                        />
                        <ExhibitionCard
                            title={'Михеев Лука Илларионович'}
                            text={'Кот Борис'}
                            csssrc={styles.out_src_winner_one}
                            link={''}
                        />
                    </div>
                </div>
                <div className={styles.outphotos}>
                    <div className={styles.outinfo}>Фотографии</div>
                    <div className={styles.outinfo_title}>
                        1 день 10 октября 2020
                    </div>
                    <div className={styles.outarbiter_info}>
                        {getImages(30, 300)}
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default out;