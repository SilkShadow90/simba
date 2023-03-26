import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/Cats.module.css';
import { Page } from '../components/Page';
import { List } from '../components/List';
import ExhibitionCard from '../components/Intro/ExhibitionCard';
import { useFetchService } from '../utils/useFetchService';
import Loader from '../components/Loader';
import { Cat } from '../api/types';

const Cats: NextPage = () => {
  const { data: catsData } = useFetchService<Cat[]>('cats') || {};

  if (!catsData) {
    return (
      <Loader isVisible={true}/>
    );
  }

  return (
    <Page title="Cats" meta="bla bla" styles={styles.container}>
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
