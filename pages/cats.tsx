import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Cats.module.css'
import React, { useEffect } from 'react';
import {Sfooter} from "../components/footer";
import {Sheader} from "../components/header";

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
    <div className={styles.container}>
      <Head>
        <title>Cats</title>
        <meta name="description" content="bla bla" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Sheader/>
        <div className={styles.cardsCats}>
            <div className={styles.cardsCatsPicture}>1</div>
            <div className={styles.cardsCatsPicture}>2</div>
            <div className={styles.cardsCatsPicture}>3</div>
            <div className={styles.cardsCatsPicture}>4</div>
        </div>
      <Sfooter/>
    </div>
  )
}

export default Cats
