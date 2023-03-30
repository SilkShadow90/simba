import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Partners.module.css';
import ExhibitionCard from "../components/ExhibitionCard";
import { List } from '../components/List';
import { useFetchService } from '../utils/useFetchService';
import NurserMethods from '../api/NurserMethods';

const NurseriesScreen: NextPage = () => {
    const { data: nurseries, loading } = useFetchService(NurserMethods.getAll) || {};

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
                        image={nurser.image}
                        link={`/nurseries/${nurser.id}`}
                    />
                ))}
            </List>
        </Page>
    );
};

export default NurseriesScreen;
