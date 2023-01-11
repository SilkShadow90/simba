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
import { getDateString } from '../../utils';

const LastexhibitionPage: NextPage = () => {
    const { data: lastexhibitionData } = useFetchService<Lastexhibition[]>('lastexhibition') || {};

    if (!lastexhibitionData) {
        return (
            <Loader isVisible={true} />
        );
    }
    console.log(lastexhibitionData);

    //   "name": "10-11 октября 2020 г, прошла Международная выставка кошек РФОО Коргоруши, Москва",
    //     "time": "Выставка кошек 10-11 октября 2020",

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
                            opacityBlock={true}
                            key={lastexhibition.id}
                            title={`Выставка кошек ${getDateString(lastexhibition.dateStart, lastexhibition.dateEnd)}`}
                            text={`${getDateString(lastexhibition.dateStart, lastexhibition.dateEnd)}, прошла${lastexhibition.type ? ` ${lastexhibition.type}` : ''} выставка кошек${lastexhibition.club ? ` ${lastexhibition.club}` : ''}, ${lastexhibition.location}`}
                            csssrc={styles.lasthibition_srcone}
                            image={lastexhibition.image}
                            link={`/exhibition/lastexhibition/${lastexhibition.id}`}
                        />
                    ))}
                </List>
            </div>
        </Page>
    );
};
export default LastexhibitionPage;
