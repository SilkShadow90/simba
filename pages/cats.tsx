import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Cats.module.css'
import React, { useEffect } from 'react';
import {Footer} from "../components/footer";
import {Header} from "../components/header";
import Image from 'next/image'
import cat from '../public/cat.jpg';

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

        <main>
            <Header/>
            <div className={styles.cardsCats}>
                <div className={styles.cardsCatsPicture}>
                    <Image  layout={"responsive"}  src={cat} />
                </div>
                <div className={styles.cardsCatsPicture}>2</div>
                <div className={styles.cardsCatsPicture}>3</div>
                <div className={styles.cardsCatsPicture}>4</div>
            </div>
            <Footer/>
        </main>
    </div>
  )
}

export default Cats
