import type { NextPage } from 'next'
import styles from '../styles/Docs.module.css'
import React, { useEffect, useState } from 'react';
import {Page} from "../components/Page";
import {Document} from "../components/Document";

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
        <Page title="Docs" meta="bla bla" styles={styles.container}>
            <div className={styles.cardsDocs}>
                <Document docs={"/vstuplenie.doc"} text='Скачать документ для вступления в клуб'/>
                <Document docs={"/title-certificate.doc"} text='Скачать заявление на титул'/>
                <Document docs={"/cattery.docx"} text='Скачать заявление на регистрацию питомника'/>
                <Document docs={"/vyazka.doc"} text='Скачать заявление направления на вязку'/>
            </div>
        </Page>
        
    )
}
export default docs

