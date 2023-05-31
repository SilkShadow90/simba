import type { NextPage } from 'next';
import React from 'react';
import { Strings } from '../resources';
import styles from '../styles/Docs.module.css';
import { Page } from '../components/Page';
import { DocsPanel } from '../components/DocsPanel';
import {DocsComponentOpened} from "../components/DocsComponentOpened";
import {DocsComponentTitles} from "../components/DocsComponentTitles";
import {DocsComponentRegister} from "../components/DocsComponentRegister";
import {DocsComponentVyazka} from "../components/DocsComponentVyazka";
import {DocsComponentPosition} from "../components/DocsComponentPosition";
import { TextBlock } from '../components/UIKit/TextBlock';
import { ScreenLayout } from '../components/UIKit/ScreenLayout';
import { useQuery } from '../redux/hooks';

const Docs: NextPage = () => {

const submit = (values:any) => {
  console.log(values)
};

  const { doc } = useQuery();
  const renderSecondElement = () => {
    switch (doc) {
      case '1':
        return (
            <DocsComponentOpened/>
        );
      case '2':
        return (
            <DocsComponentTitles onSubmit={submit}/>
        );
      case '3':
        return (
            <DocsComponentRegister/>
        );
      case '4':
        return (
            <DocsComponentVyazka onSubmit={submit}/>
        );
      case '5':
        return (
            <DocsComponentPosition/>
        );
      default:
        return (
          <TextBlock type={'H3'}>
            {'<- Выберите документ'}
          </TextBlock>
        );
    }
  };

  return (
    <Page title="Docs" meta="bla bla">
      <ScreenLayout>
        <TextBlock type={'H1'}>
          {'Документы'}
        </TextBlock>
        {renderSecondElement()}
      </ScreenLayout>
      <div className={styles.docPanel}>
          <div className={styles.docsCardsLeft}>
            <DocsPanel text={Strings.DocsPanel.openedvstuplenie} type="1"/>
            <DocsPanel text={Strings.DocsPanel.openedtitul} type="2"/>
            <DocsPanel text={Strings.DocsPanel.openedregister} type="3"/>
            <DocsPanel text={Strings.DocsPanel.openedvyazka} type="4"/>
            <DocsPanel text={Strings.DocsPanel.openedposition} type="5"/>
          </div>

        <div className={styles.docsText}>
          <TextBlock type={'Link'}>
            {'Выбор документа'}
          </TextBlock>
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
