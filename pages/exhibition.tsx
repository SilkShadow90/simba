import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Ex.module.css';
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import lastEx from "../public/lastEx.jpg";
import { List } from '../components/List';
import nolastEX from "../public/nolastEX.jpg";

const exhibition: NextPage = () => {
    return (
        <Page title="Выставки" meta="bla bla" styles={styles.container} >
            <List>
                <ExhibitionCard
                    link={"/exhibition/nearexhibition"}
                    hoverBlock={true}
                    opacityBlock={true}
                    title={"Ближайшие выставки"}
                    text={'Информация о ближайшей выставке кошек КЛК Коргоруши г. Москва.'}
                    csssrc={styles.exhibition_Main__leftColumn}
                    image={lastEx.src}
                />
                <ExhibitionCard
                    link={"/exhibition/lastexhibition"}
                    hoverBlock={true}
                    opacityBlock={true}
                    title={"Прошедшие выставки"}
                    text={'Результаты и и фоторепортаж с прошедших выставок КЛК Коргоруши'}
                    csssrc={styles.exhibition_Main__rightColumn}
                    image={nolastEX.src}
                />
                <div />
            </List>
        </Page>
    );
};

export default exhibition;
