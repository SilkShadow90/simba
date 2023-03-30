import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Partners.module.css';
import ExhibitionCard from '../components/ExhibitionCard';
import { useFetchService } from '../utils/useFetchService';
import NurserMethods from '../api/NurserMethods';
import { Grid } from '../components/UIKit/Grid';
import { GridItem } from '../components/UIKit/GridItem';
import { ScreenLayout } from '../components/UIKit/ScreenLayout';

const NurseriesScreen: NextPage = () => {
  const { data: nurseries, loading } = useFetchService(NurserMethods.getAll) || {};

  return (
    <Page title="Питомники" meta="bla bla" styles={styles.container} isLoading={loading}>
      <ScreenLayout>
        <Grid>
          {!!nurseries && nurseries.map((nurser) => (
            <GridItem key={nurser.id}>
              <ExhibitionCard
                hoverBlock={true}
                opacityBlock={true}
                title={nurser.worked}
                text={nurser.name}
                image={nurser.image}
                link={`/nurseries/${nurser.id}`}
              />
            </GridItem>
          ))}
        </Grid>
      </ScreenLayout>
    </Page>
  );
};

export default NurseriesScreen;
