import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Partners.module.css';
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import {useFetchService} from "../utils/useFetchService";
import { Nurser } from "./api/nurser/[id]";
import { List } from '../components/List';
import Loader from "../components/Loader";

const NurseriesScreen: NextPage = () => {

    const { data: nurseriesData } = useFetchService<Nurser[]>('nurseries') || {};

    if (!nurseriesData) {
        return (
            <Loader isVisible={true} />
        );
    }
    console.log(nurseriesData)

    return (
        <Page title="Питомники" meta="bla bla" styles={styles.container} >
            <List>
                {!!nurseriesData && nurseriesData.map((nurseries) => (
                    <ExhibitionCard
                        opacityBlock={true}
                        key={nurseries.id}
                        title={nurseries.worked}
                        text={nurseries.name}
                        csssrc={styles.nurseries_Main__src}
                        image={nurseries.image}
                        link={`/nurseries/${nurseries.id}`}
                    />
                ))}
            </List>
        </Page>
    );
};

export default NurseriesScreen;
