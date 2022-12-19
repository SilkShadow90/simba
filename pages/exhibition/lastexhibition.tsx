import type { NextPage } from 'next';
import React from 'react';
import styles from '../../styles/Lastexhibition.module.css';
import {Page} from "../../components/Page";
import ExhibitionCard from "../../components/Intro/ExhibitionCard";
import {FirstBack} from "../../components/Back";
import { List } from '../../components/List';
import eft from '../../public/eft.jpg';
import efttwo from '../../public/efttwo.jpg';
import eftthree from '../../public/eftthree.jpg';

const lastexhibition: NextPage = () => {
    return (
        <Page title="Прошедшие выставки" meta="bla bla" styles={styles.container}>
            <div>
                <div className={styles.lasthibition_header}>
                    <FirstBack link={'/exhibition'}/>
                    <div className={styles.lasthibition_title}>Прошедшие выставки</div>
                </div>
                <List className={styles.exhibition_Main}>
                    <ExhibitionCard
                        title={'Выставка кошек 10-11 октября 2020'}
                        text={'10-11 октября 2020 г, прошла Международная выставка кошек РФОО Коргоруши, Москва'}
                        csssrc={styles.lasthibition_srcone}
                        link={'lastexhibition/out/1'}
                        image={eft.src}
                    />
                    <ExhibitionCard
                        title={'Выставка кошек 25-26 января 2020 г.'}
                        text={'25-26 января 2020г, прошла Международная выставка кошек памяти Людмилы Есиной, РФОО Коргоруши, Москва, парк Сокольники'}
                        csssrc={styles.lasthibition_srctwo}
                        link={'lastexhibition/out/2'}
                        image={efttwo.src}
                    />
                    <ExhibitionCard
                        title={'Выставка кошек 05-06 октября 2019'}
                        text={'05-06 октября 2019 г, прошла Международная выставка кошек РФОО Коргоруши, Москва'}
                        csssrc={styles.lasthibition_srcthree}
                        image={eftthree.src}
                        link={'lastexhibition/out/3'}
                    />
                </List>
            </div>
        </Page>
    );
};
export default lastexhibition;
