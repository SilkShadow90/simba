import type { NextPage } from 'next';
import React from 'react';
import styles from '../../styles/Lastexhibition.module.css';
import {Page} from "../../components/Page";
import ExhibitionCard from "../../components/Intro/ExhibitionCard";
import {FirstBack} from "../../components/Back";
import { List } from '../../components/List';
import {useFetchService} from "../../utils/useFetchService";
import {Lastexhibition} from "../api/lastexhibition";
import Loader from "../../components/Loader";

const lastexhibition: NextPage = () => {
    const { data: lastexhibitionData } = useFetchService<Lastexhibition[]>('lastexhibition') || {};

    if (!lastexhibitionData) {
        return (
            <Loader isVisible={true} />
        );
    }
    console.log(lastexhibitionData)

    return (
        <Page title="Прошедшие выставки" meta="bla bla" styles={styles.container}>
            <div>
                <div className={styles.lasthibition_header}>
                    <FirstBack link={'/exhibition'}/>
                    <div className={styles.lasthibition_title}>Прошедшие выставки</div>
                </div>
                <List>

                    {!!lastexhibitionData && lastexhibitionData.map((lastexhibition) => (
                        <ExhibitionCard
                            key={lastexhibition.id}
                            title={lastexhibition.time}
                            text={lastexhibition.name}
                            csssrc={styles.lasthibition_srcone}
                            image={lastexhibition.image}
                            link={`/exhibition/lastexhibition/${lastexhibition.id}`}
                        />
                    ))}

                    {/*<ExhibitionCard*/}
                    {/*    title={'Выставка кошек 10-11 октября 2020'}*/}
                    {/*    text={'10-11 октября 2020 г, прошла Международная выставка кошек РФОО Коргоруши, Москва'}*/}
                    {/*    csssrc={styles.lasthibition_srcone}*/}
                    {/*    link={'lastexhibition/1'}*/}
                    {/*    image={eft.src}*/}
                    {/*/>*/}
                    {/*<ExhibitionCard*/}
                    {/*    title={'Выставка кошек 25-26 января 2020 г.'}*/}
                    {/*    text={'25-26 января 2020г, прошла Международная выставка кошек памяти Людмилы Есиной, РФОО Коргоруши, Москва, парк Сокольники'}*/}
                    {/*    csssrc={styles.lasthibition_srctwo}*/}
                    {/*    link={'lastexhibition/2'}*/}
                    {/*    image={efttwo.src}*/}
                    {/*/>*/}
                    {/*<ExhibitionCard*/}
                    {/*    title={'Выставка кошек 05-06 октября 2019'}*/}
                    {/*    text={'05-06 октября 2019 г, прошла Международная выставка кошек РФОО Коргоруши, Москва'}*/}
                    {/*    csssrc={styles.lasthibition_srcthree}*/}
                    {/*    image={eftthree.src}*/}
                    {/*    link={'lastexhibition/3'}*/}
                    {/*/>*/}
                </List>
            </div>
        </Page>
    );
};
export default lastexhibition;
