import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/Cats.module.css';
import { Page } from '../components/Page';
import { List } from '../components/List';
import ExhibitionCard from '../components/Intro/ExhibitionCard';
import { useFetchService } from '../utils/useFetchService';
import { Breed, Cat } from '../api/types';
import CatMethods from '../api/CatMethods';
import DictionaryMethods from '../api/DictionaryMethods';

const Cats: NextPage = () => {
  const { data: cats, loading: catLoading } = useFetchService<Cat[]>(CatMethods.getAll);
  const { data: breeds, loading: breedsLoading } = useFetchService<Record<Breed['id'], Breed>>(DictionaryMethods.getBreedRecord);

  return (
    <Page title="Cats" meta="bla bla" styles={styles.container} isLoading={catLoading || breedsLoading}>
      <List>
        {!!cats && !!breeds && cats.map((cat) => (
          <ExhibitionCard
            hoverBlock={true}
            opacityBlock={true}
            key={cat.id}
            title={cat.name}
            text={breeds[cat.breedId]?.name}
            csssrc={styles.cats_Main__src}
            image={cat.image}
            link={`/cats/${cat.id}`}
          />
        ))}
      </List>
    </Page>
  );
};

export default Cats;
