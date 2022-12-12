import type { NextPage } from 'next';
import React from 'react';
import styles from '../../styles/Cats.module.css';
import cat from '../../public/cat.jpg';
import catOne from '../../public/catOne.jpeg';
import cattwo from '../../public/cattwo.jpg';
import catthree from '../../public/catthree.jpg';
import { Page } from '../../components/Page';
import { List } from '../../components/List';
import ExhibitionCard from "../../components/Intro/ExhibitionCard";
import {useRouter} from "next/router";

const Id: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log('id', id);
  return (
      <Page title="Id" meta="bla bla" styles={styles.container} >
          <List className={styles.cats_Main}>
              <ExhibitionCard
                  link={"#"}
                  title={"Прометей"}
                  text={'Веслоухая британская'}
                  csssrc={styles.cats_Main__src}
                  image={cat.src}
              />
              <ExhibitionCard
                  link={"#"}
                  title={"Шпилька"}
                  text={'дворовый бродяга'}
                  csssrc={styles.cats_Main__src}
                  image={catOne.src}
              />
              <ExhibitionCard
                  link={"#"}
                  title={"Пушок"}
                  text={'кокер спаниель'}
                  csssrc={styles.cats_Main__src}
                  image={cattwo.src}
              />
              <ExhibitionCard
                  link={"#"}
                  title={"Платон"}
                  text={'английская'}
                  csssrc={styles.cats_Main__src}
                  image={catthree.src}
              />
          </List>
          {/*<div className={styles.cardsCats}>*/}
          {/*    <Card name={"Прометей"} image={cat} family={"Веслоухая британская"} years={"5 лет"}/>*/}
          {/*    <Card name={"Шпилька"} image={catOne} family={"дворовый бродяга"} years={"6 лет"}/>*/}
          {/*    <Card name={"Пушок"} image={cattwo} family={"кокер спаниель"} years={"7 лет"}/>*/}
          {/*    <Card name={"Платон"} image={catthree} family={"английская"} years={"8 лет"}/>*/}
          {/*</div>*/}
      </Page>
  );
};

export default Id;
