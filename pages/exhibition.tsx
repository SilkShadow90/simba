import type { NextPage } from 'next'
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Ex.module.css';
import ExhibitionCard from "../components/Intro/ExhibitionCard";

const exhibition: NextPage = () => {
    return (
        <Page title="Выставки" meta="bla bla" styles={styles.container} >
            <div className={styles.exhibition_Main}>
                <ExhibitionCard
                    link={"/nearexhibition"}
                    title={"Ближайшие выставки"}
                    text={'Информация о ближайшей выставке кошек КЛК Коргоруши г. Москва.'}
                    csssrc={styles.exhibition_Main__leftColumn}
                />
                <ExhibitionCard
                    link={"/lastexhibition"}
                    title={"Прошедшие выставки"}
                    text={'Результаты и и фоторепортаж с прошедших выставок КЛК Коргоруши'}
                    csssrc={styles.exhibition_Main__rightColumn}
                />
            </div>
        </Page>
    )
}

export default exhibition;