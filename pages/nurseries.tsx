import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Partners.module.css';
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import { List } from '../components/List';
import Loader from "../components/Loader";
import { Nurser } from '../api/types';
import { useFetchService } from '../utils/useFetchService';

const NurseriesScreen: NextPage = () => {
    const { data: nurseries } = useFetchService<Nurser[]>('nurseries') || {};

    if (!nurseries) {
        return (
            <Loader isVisible={true} />
        );
    }
    return (
        <Page title="Питомники" meta="bla bla" styles={styles.container} >
            <List>
                {!!nurseries && nurseries.map((nurser) => (
                    <ExhibitionCard
                        hoverBlock={true}
                        opacityBlock={true}
                        key={nurser.id}
                        title={nurser.worked}
                        text={nurser.name}
                        csssrc={styles.nurseries_Main__src}
                        image={nurser.image}
                        link={`/nurseries/${nurser.id}`}
                    />
                ))}
            </List>
        </Page>
    );
};

export default NurseriesScreen;
