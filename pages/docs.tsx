import type { NextPage } from 'next';
import styles from '../styles/Docs.module.css';
import React from 'react';
import { Page } from '../components/Page';
import { DocsPanel } from '../components/DocsPanel';
import { useSelector } from 'react-redux';
import {DocsComponentOpened} from "../components/DocsComponentOpened";
import {DocsComponentTitles} from "../components/DocsComponentTitles";
import {DocsComponentRegister} from "../components/DocsComponentRegister";
import {DocsComponentVyazka} from "../components/DocsComponentVyazka";
import {DocsComponentPosition} from "../components/DocsComponentPosition";


const Docs: NextPage = () => {
  const docsState = useSelector((state: any) => state.docsState);

  const renderSecondElement = () => {
    switch (Object.entries(docsState).find(([_, value]) => value)?.[0]) {
      case 'openedvstuplenie':
        return (
            <DocsComponentOpened/>
        );
      case 'openedtitul':
        return (
            <DocsComponentTitles/>
        );
      case 'openedregister':
        return (
            <DocsComponentRegister/>
        );
      case 'openedvyazka':
        return (
            <DocsComponentVyazka/>
        );
      case 'openedposition':
        return (
            <DocsComponentPosition/>
        );
    }

    return null;
  };

  return (
    <Page title="Docs" meta="bla bla" styles={styles.container}>
      <div className={styles.docsCards}>
        <div className={styles.docsCardsLeft}>
          <DocsPanel text={'Вступление в клуб'} type="openedvstuplenie"/>
          <DocsPanel text={'Заявление на титул'} type="openedtitul"/>
          <DocsPanel text={'Регистрация питомника'} type="openedregister"/>
          <DocsPanel text={'Заявление на вязку'} type="openedvyazka"/>
          <DocsPanel text={'Племенное положение'} type="openedposition"/>
        </div>
        <div className={styles.docsCardsRight}>
          {renderSecondElement()}
        </div>
      </div>
    </Page>
  );
};

// This function gets called at build time
// export async function getServerSideProps() {
//   try {
//
//     console.warn('qweqwewqe');
//     const response = await fetch('/api/breeds');
//
//     const { data }: ApiResponse<Breed[]> = await response.json() || {};
//
//     if (data) {
//       return {
//         props: {
//           breeds: data,
//         },
//       }
//     }
//
//     throw Error('Что-то пошло не так');
//   } catch (e) {
//     console.error(e);
//
//     return {
//       props: {}
//     }
//   }
// }

export default React.memo(Docs);
