import type { NextPage } from 'next'
import styles from '../styles/Cats.module.css'
import React, { useEffect } from 'react';
import Image from 'next/image'
import cat from '../public/cat.jpg';
import { Page } from '../components/Page';

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
              <div className={styles.cardsCatsPicture}>
                  <Image layout="fill" objectFit="cover" src={cat} />
              </div>
              <div className={styles.cardsCatsPicture}>2</div>
              <div className={styles.cardsCatsPicture}>3</div>
              <div className={styles.cardsCatsPicture}>4</div>
          </div>
      </Page>
  )
}

export default Cats
