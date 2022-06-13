import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Cats.module.css'
import { useEffect } from 'react';
import { AxiosService } from '../utils';

const Cats: NextPage = () => {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosService.get('/api/hello') || {}
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Cats</title>
        <meta name="description" content="bla bla" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Cats
