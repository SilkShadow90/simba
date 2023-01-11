import type { NextPage } from 'next';
import {useRouter} from "next/router";
import React from 'react';
import styles from '../styles/Cats.module.css';
import cat from '../public/cat.jpg';
import catOne from '../public/catOne.jpeg';
import cattwo from '../public/cattwo.jpg';
import catthree from '../public/catthree.jpg';
import { Page } from '../components/Page';
import { List } from '../components/List';
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import {useFetchService} from "../utils/useFetchService";
import {Cats} from "./api/cats";
import Loader from "../components/Loader";


const Cats: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log('id', id);


    const { data: catsData } = useFetchService<Cats[]>('cats') || {};

    if (!catsData) {
        return (
            <Loader isVisible={true} />
        );
    }
    console.log(catsData)

  return (
      <Page title="Cats" meta="bla bla" styles={styles.container} >
          <List>
              {!!catsData && catsData.map((cats) => (
                  <ExhibitionCard
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
