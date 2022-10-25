import Head from 'next/head';
import { Header } from './Header';
import { Footer } from './Footer';
import React, { PropsWithChildren } from 'react';

interface Props {
    title: string;
    meta: string;
    styles: string;
    withoutHeaderAndFooter?: boolean;
}

export const Page = ({ children, title, meta, styles, withoutHeaderAndFooter = false }: PropsWithChildren<Props>) => {
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
                  {children}
                </div>
              {!withoutHeaderAndFooter && <Footer/>}
            </main>
        </div>
    )
}
