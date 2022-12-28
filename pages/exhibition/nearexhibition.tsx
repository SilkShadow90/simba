import type { NextPage } from 'next';
import React from 'react';
import styles from '../../styles/Nearex.module.css';
import {Page} from "../../components/Page";
import ExhibitionCard from "../../components/Intro/ExhibitionCard";
import {FirstBack} from "../../components/Back";
import { List } from '../../components/List';

import lastEx from "../../public/lastEx.jpg";
import {useFetchService} from "../../utils/useFetchService";
import Loader from "../../components/Loader";
import {Nearexhibition} from "../api/nearexhibition";
import stars from "../../public/stars.jpg";

const nearexhibition: NextPage = () => {

    const { data: nearexhibitionData } = useFetchService<Nearexhibition[]>('nearexhibition') || {};

    if (!nearexhibitionData) {
        return (
            <Loader isVisible={true} />
        );
    }
    console.log(nearexhibitionData)

    return (
        <Page title="Ближайщие выставки" meta="bla bla" styles={styles.container}>
            <div className={styles.nearlasthibition_header}>
                <FirstBack link={"/exhibition"}/>
                <div className={styles.nearlasthibition_title}>Ближайщие выставки</div>
            </div>
            <List>
                {!!nearexhibitionData && nearexhibitionData.map((nearexhibition) => (
                    <ExhibitionCard
                        key={nearexhibition.id}
                        title={nearexhibition.name}
                        text={nearexhibition.time}
                        csssrc={styles.nearexhibition_Main__src}
                        image={nearexhibition.image}
                        link={`/exhibition/nearexhibition/${nearexhibition.id}`}
                    />
                ))}
            </List>
        </Page>
    );
};
export default nearexhibition;
