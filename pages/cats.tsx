import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/Cats.module.css';
import { Page } from '../components/Page';
import { List } from '../components/List';
import ExhibitionCard from '../components/Intro/ExhibitionCard';
import { useFetchService } from '../utils/useFetchService';
import { Cat } from '../api/types';
import CatMethods from '../api/CatMethods';

const Cats: NextPage = () => {
  const { data: catsData, loading } = useFetchService<Cat[]>(CatMethods.getCats) || {};

  return (
    <Page title="Cats" meta="bla bla" styles={styles.container} isLoading={loading}>
      <List>
        {!!catsData && catsData.map((cats) => (
          <ExhibitionCard
            hoverBlock={true}
            opacityBlock={true}
            key={cats.id}
            title={cats.name}
            text={cats.breed}
            csssrc={styles.cats_Main__src}
            image={cats.image}
            link={`/cats/${cats.id}`}
          />
        ))}
      </List>
    </Page>
  );
};

export default Cats;
