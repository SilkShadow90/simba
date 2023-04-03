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
import { ScreenLayout } from './UIKit/ScreenLayout';
import { Portal } from './Portal';

interface Props {
  title: string;
  meta?: string;
  styles?: string;
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
  const isContacts = router.pathname.includes('contacts');

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
          <ScreenLayout stretch marginVertical={0}>
            {!isAdmin && !isContacts && (
              <>
                <Modal active={modalActive} onClose={onClose}/>
                <button className={pageStyles.feedback_modal} onClick={onOpen}>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image src={feedback}/>
                </button>
              </>
            )}
            {children}
          </ScreenLayout>
          {isLoading && (
            <Portal>
              <Loader isVisible />
            </Portal>
          )}
          {!withoutHeaderAndFooter && <Footer/>}
        </main>
      </div>
    </>
  );
};
