import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Docs.module.css'
import React, { useEffect } from 'react';
import {Footer} from "../components/Footer";
import {Header} from "../components/Header";

const docs: NextPage = () => {
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
                <div className={styles.cardsDocs}>
                    <a  className={styles.cardsDocsInfo} target='_blank' download href="/vstuplenie.doc">Скачать документ для вступления в клуб</a>
                    <a  className={styles.cardsDocsInfo} target='_blank' download href="http://korgorushi.com/images/docs/title-certificate.doc">Скачать заявление на титул</a>
                    <a  className={styles.cardsDocsInfo} target='_blank' download href="http://korgorushi.com/images/docs/cattery.docx">Скачать заявление на регистрацию питомника</a>
                    <a  className={styles.cardsDocsInfo} target='_blank' download href="http://korgorushi.com/images/docs/vyazka.doc">Скачать заявление направления на вязку</a>
                </div>
                <Footer/>
            </main>
        </div>
    )
}

export default docs
