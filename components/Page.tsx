import Head from 'next/head';
import React, { PropsWithChildren, useCallback, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Header } from './Header';
import { Footer } from './Footer';
import Modal from './Modal';
import pageStyles from '../styles/Page.module.css';
import feedback from '../public/feedback.png';
import Loader from './Loader';

interface Props {
  title: string;
  meta: string;
  styles: string;
  withoutHeaderAndFooter?: boolean;
  isLoading?: boolean;
}

export const Page = ({
  children,
  title,
  meta,
  styles,
  withoutHeaderAndFooter = false,
  isLoading = false,
}: PropsWithChildren<Props>) => {
  const [modalActive, setModalActive] = useState(false);
  const router = useRouter();

  const isAdmin = router.pathname.includes('admin');

  const onClose = useCallback(() => {
    setModalActive(false);
  }, []);

  const onOpen = useCallback(() => {
    setModalActive(true);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={meta}/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div className={styles}>
        <main>
          {!withoutHeaderAndFooter && <Header/>}
          <div className="flex">
            {!isAdmin && (
              <>
                <Modal active={modalActive} onClose={onClose}/>
                <div className={pageStyles.open_Modal}>
                  <Image src={feedback} objectFit={'cover'} onClick={onOpen}/>
                </div>
              </>
            )}
            {children}
          </div>
          {isLoading && (
            <div className={pageStyles.page_loaderBox}>
              <Loader isVisible={true}/>
            </div>
          )}
          {!withoutHeaderAndFooter && <Footer/>}
        </main>
      </div>
    </>
  );
};
