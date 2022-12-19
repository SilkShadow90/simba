import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Ex.module.css';
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import lastEx from "../public/lastEx.jpg";
import nolastEX from "../public/nolastEX.jpg";

const exhibition: NextPage = () => {
    return (
        <Page title="Выставки" meta="bla bla" styles={styles.container} >
            <div className={styles.exhibition_Main}>
                <ExhibitionCard
                    link={"/exhibition/nearexhibition"}
                    title={"Ближайшие выставки"}
                    text={'Информация о ближайшей выставке кошек КЛК Коргоруши г. Москва.'}
                    csssrc={styles.exhibition_Main__leftColumn}
                    image={lastEx.src}
                />
                <ExhibitionCard
                    link={"/exhibition/lastexhibition"}
                    title={"Прошедшие выставки"}
                    text={'Результаты и и фоторепортаж с прошедших выставок КЛК Коргоруши'}
                    csssrc={styles.exhibition_Main__rightColumn}
                    image={nolastEX.src}
                />
            </div>
        </Page>
    );
};

export default exhibition;
