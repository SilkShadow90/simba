import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Docs.module.css'
import React, { useEffect, useState } from 'react';
import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {Page} from "../components/Page";

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

    const  [text, setText] = useState(false);

    return (
        <Page title="Docs" meta="bla bla" styles={styles.container}>
            <div className={styles.cardsDocs}>
                <button onClick={() => setText}>
                <a className={styles.cardsDocsInfo} target='_blank' download href="/vstuplenie.doc">Скачать документ для
                    вступления в клуб</a>
                </button>
                <a className={styles.cardsDocsInfo} target='_blank' download
                   href="http://korgorushi.com/images/docs/title-certificate.doc">Скачать заявление на титул</a>
                <a className={styles.cardsDocsInfo} target='_blank' download
                   href="http://korgorushi.com/images/docs/cattery.docx">Скачать заявление на регистрацию питомника</a>
                <a className={styles.cardsDocsInfo} target='_blank' download
                   href="http://korgorushi.com/images/docs/vyazka.doc">Скачать заявление направления на вязку</a>
            </div>
        </Page>
    )
}
export default docs

