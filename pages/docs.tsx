import type { NextPage } from 'next'
import styles from '../styles/Docs.module.css'
import React, { useEffect, useState } from 'react';
import {Page} from "../components/Page";
import {Document} from "../components/Document";
import { Strings } from '../resources';

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
                <Document docs={"/vstuplenie.doc"} text={Strings.docs.vstuplenie}/>
                <Document docs={"/title-certificate.doc"} text={Strings.docs.titul}/>
                <Document docs={"/cattery.docx"} text={Strings.docs.register}/>
                <Document docs={"/vyazka.doc"} text={Strings.docs.vyazka}/>
            </div>
        </Page>
        
    )
}
export default docs

