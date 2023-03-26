import type { NextPage } from 'next';
import React from 'react';
import styles from '../../styles/Lastexhibition.module.css';
import {Page} from "../../components/Page";
import ExhibitionCard from "../../components/Intro/ExhibitionCard";
import {FirstBack} from "../../components/Back";
import { List } from '../../components/List';
import {useFetchService} from "../../utils/useFetchService";
import Loader from "../../components/Loader";
import {getDateString} from "../../utils";
import { Exhibition } from '../../api/types';

const NearexhibitionPage: NextPage = () => {
    const { data: lastexhibitionData } = useFetchService<Exhibition[]>('nearexhibition') || {};

    if (!lastexhibitionData) {
        return (
            <Loader isVisible={true} />
        );
    }

    console.log(lastexhibitionData);

    return (
        <Page title="Ближайщие выставки" meta="bla bla" styles={styles.container}>
            <div className={styles.lasthibition_header}>
                <FirstBack link={"/exhibition"}/>
                <div className={styles.lasthibition_title}>Ближайщие выставки</div>
            </div>
            <List>
                {!!lastexhibitionData && lastexhibitionData.map((lastexhibition) => (
                    <ExhibitionCard
                        hoverBlock={true}
                        opacityBlock={true}
                        key={lastexhibition.id}
                        title={`Выставка кошек ${getDateString(lastexhibition.dateStart, lastexhibition.dateEnd)}`}
                        text={`${getDateString(lastexhibition.dateStart, lastexhibition.dateEnd)}, будет проходить${lastexhibition.type ? ` ${lastexhibition.type}` : ''} выставка кошек${lastexhibition.club ? ` ${lastexhibition.club}` : ''}, ${lastexhibition.location}`}
                        csssrc={styles.lasthibition_srcone}
                        image={lastexhibition.image}
                        link={`/exhibition/nearexhibition/${lastexhibition.id}`}
                    />
                ))}
            </List>
        </Page>
    );
};
export default NearexhibitionPage;
