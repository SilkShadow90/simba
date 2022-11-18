import Head from 'next/head';
import { Header } from './Header';
import { Footer } from './Footer';
import React, { PropsWithChildren, useCallback, useState } from 'react';
import Modal from './Modal';
import pageStyles from '../styles/Page.module.css';
import Image from 'next/image';
import email from '../public/email.png';

interface Props {
    title: string;
    meta: string;
    styles: string;
    withoutHeaderAndFooter?: boolean;
}

export const Page = ({ children, title, meta, styles, withoutHeaderAndFooter = false }: PropsWithChildren<Props>) => {
    const [modalActive, setModalActive] = useState(false);

    const onClose = useCallback(() => {
      setModalActive(false)
    }, [])

    return (
        <div className={styles}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={meta} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
              {!withoutHeaderAndFooter && <Header/>}
                <div className='flex'>
                  <Modal active={modalActive} onClose={onClose}/>
                  <div className={pageStyles.open_Modal}>
                    <Image src={email} objectFit={"cover"}  onClick={()=>{setModalActive(true)}}/>
                  </div>
                  {children}
                </div>
              {!withoutHeaderAndFooter && <Footer/>}
            </main>
        </div>
    )
}
