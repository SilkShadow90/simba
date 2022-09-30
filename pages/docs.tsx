// import type { NextPage } from 'next'
// import styles from '../styles/Docs.module.css'
// import React, { useEffect, useState } from 'react';
// import {Page} from "../components/Page";
import {Document} from "../components/Document";
import { Strings } from '../resources';
//
// const docs: NextPage = () => {
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
//
//     return (
//         <Page title="Docs" meta="bla bla" styles={styles.container}>
//             <div className={styles.cardsDocs}>
//                 <Document docs={"/vstuplenie.doc"} text={Strings.docs.vstuplenie}/>
//                 <Document docs={"/title-certificate.doc"} text={Strings.docs.titul}/>
//                 <Document docs={"/cattery.docx"} text={Strings.docs.register}/>
//                 <Document docs={"/vyazka.doc"} text={Strings.docs.vyazka}/>
//             </div>
//         </Page>
//
//     )
// }
// export default docs

import type { NextPage } from 'next'
import styles from '../styles/Admin.module.css'
import React, { useEffect, useState } from 'react';
import { Page } from '../components/Page';
import { DocsPanel } from '../components/AdminPanel';
import { useSelector } from 'react-redux';

const Docs: NextPage = () => {
    const docsState = useSelector((state: any) => state.docsState)

    const renderSecondElement = () => {
        switch (Object.entries(docsState).find(([_, value]) => value)?.[0]) {
            case 'openedvstuplenie':
                return (
                    <Document docs={"/vstuplenie.doc"} text={Strings.docs.vstuplenie}/>
                )
            case 'openedtitul':
                return (
                    <Document docs={"/title-certificate.doc"} text={Strings.docs.titul}/>
                )
            case 'openedregister':
                return (
                    <Document docs={"/cattery.docx"} text={Strings.docs.register}/>
                )
            case 'openedvyazka':
                return (
                   <Document docs={"/vyazka.doc"} text={Strings.docs.vyazka}/>
                )
        }

        return null;
    }

    return (
        <Page title="Docs" meta="bla bla" styles={styles.container} >
            <div className={styles.adminCards}>
                <div className={styles.adminCardsLeft}>
                    <DocsPanel text={"Главная"} type='openedvstuplenie' />
                    <DocsPanel text={"Кошки"} type='openedtitul' />
                    <DocsPanel text={"Документы"} type='openedregister' />
                    <DocsPanel text={"Выставки"} type='openedvyazka' />
                </div>
                <div className={styles.adminCardsRight}>
                    {renderSecondElement()}
                </div>
            </div>
        </Page>
    )
}

export default Docs
