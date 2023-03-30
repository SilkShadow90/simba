import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/Cats.module.css';
import { Page } from '../components/Page';
import ExhibitionCard from '../components/ExhibitionCard';
import { useFetchService } from '../utils/useFetchService';
import { Breed, Cat } from '../api/types';
import CatMethods from '../api/CatMethods';
import DictionaryMethods from '../api/DictionaryMethods';
import { Grid } from '../components/UIKit/Grid';
import { ScreenLayout } from '../components/UIKit/ScreenLayout';
import { GridItem } from '../components/UIKit/GridItem';

const Cats: NextPage = () => {
  const { data: cats, loading: catLoading } = useFetchService<Cat[]>(CatMethods.getAll);
  const { data: breeds, loading: breedsLoading } = useFetchService<Record<Breed['id'], Breed>>(DictionaryMethods.getBreedRecord);

  return (
    <Page title="Cats" meta="bla bla" styles={styles.container} isLoading={catLoading || breedsLoading}>
      <ScreenLayout>
        <Grid>
          {!!cats && !!breeds && cats.map((cat) => (
            <GridItem key={cat.id}>
              <ExhibitionCard
                hoverBlock={true}
                opacityBlock={true}
                title={cat.name}
                text={breeds[cat.breedId]?.name}
                image={cat.image}
                link={`/cats/${cat.id}`}
              />
            </GridItem>
          ))}
        </Grid>
      </ScreenLayout>
    </Page>
  );
};

export default Cats;
