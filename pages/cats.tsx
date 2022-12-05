import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Cats.module.css';
import cat from '../public/cat.jpg';
import catOne from '../public/catOne.jpeg';
import cattwo from '../public/cattwo.jpg';
import catthree from '../public/catthree.jpg';
import { Page } from '../components/Page';
import {Card} from "../components/Card";

const aas = 5 ;
const Cats: NextPage = () => {
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await AxiosService.get('/api/hello') || {}
  //       console.log(data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })()
  // }, [])

  return (
      <Page title="Cats" meta="bla bla" styles={styles.container} >
          <div className={styles.cardsCats}>
              <Card name={"Прометей"} image={cat} family={"Веслоухая британская"} years={"5 лет"}/>
              <Card name={"Шпилька"} image={catOne} family={"дворовый бродяга"} years={"6 лет"}/>
              <Card name={"Пушок"} image={cattwo} family={"кокер спаниель"} years={"7 лет"}/>
              <Card name={"Платон"} image={catthree} family={"английская"} years={"8 лет"}/>
          </div>
      </Page>
  );
};

export default Cats;
