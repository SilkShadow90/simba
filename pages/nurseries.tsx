import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Partners.module.css';
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import { List } from '../components/List';
import { Nurser } from '../api/types';
import { useFetchService } from '../utils/useFetchService';
import NurserMethods from '../api/NurserMethods';

const NurseriesScreen: NextPage = () => {
    const { data: nurseries, loading } = useFetchService<Nurser[]>(NurserMethods.getNurseries) || {};

    return (
        <Page title="Питомники" meta="bla bla" styles={styles.container} isLoading={loading}>
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
