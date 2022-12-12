import type { NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import { Strings } from '../resources';
import styles from '../styles/Docs.module.css';
import { Page } from '../components/Page';
import { DocsPanel } from '../components/DocsPanel';
import {DocsComponentOpened} from "../components/DocsComponentOpened";
import {DocsComponentTitles} from "../components/DocsComponentTitles";
import {DocsComponentRegister} from "../components/DocsComponentRegister";
import {DocsComponentVyazka} from "../components/DocsComponentVyazka";
import {DocsComponentPosition} from "../components/DocsComponentPosition";



const Docs: NextPage = () => {



  const PascalCase = true;
  const snake_case = true;
  // formatText('camelCase', 'text,text. VaLid  Date') // textTextValidDate


















  const formatText = (typeText:any, ...str:[string,string?,string?,string?]) => {
    if (typeText === "camelCase") {

      return str.join().
      replaceAll(",","_").
      replaceAll(".","_").
      replaceAll("  ","_").
      replaceAll(" ","").
      split("_").
      map(i => i[0].toUpperCase() + i.slice(1).toLowerCase()).join("").split('_')


      // replaceAll(" ","_")
      // split("_").
      // map(i => i[0].toLowerCase()+ i.slice(1).toLowerCase()).join()
    }
  }
    console.log(formatText("camelCase",'text,text. VaLid  Date'))



  // formatText('camelCase', 'text,text. VaLid  Date') // textTextValidDate
  // formatText('snake_case', 'VaLid  Date',  'TimE', 'third', 'four five') // valid_date_time_third_four_five


  // filter(i => i!="").


        //.map(i=>i[0].toUpperCase())
        // .replaceAll(" ","")
  // formatText('PascalCase', 'VaLid  Date',  'TimE') // ValidDateTime

  //   паскаль готов
  // if (typeText === "PascalCase") {
  //   return str.join().
  //   replaceAll(","," ").
  //   replaceAll("."," ").
  //   split(" ").filter(i => i!="").
  //   map(i => i[0].toUpperCase()+ i.slice(1).toLowerCase()).
  //   join("")
  // }
  // }
  // снейк готов
  // if (typeText === "snake_case") {
  //   return str.join().
  //   replaceAll(",","_").
  //   replaceAll(".","_").
  //   replaceAll("  ","_").
  //   replaceAll(" ","_").
  //   split("_").
  //   map(i => i[0].toLowerCase()+ i.slice(1).toLowerCase()).join().
  //   replaceAll(",","_")
  // }














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
          <DocsPanel text={Strings.DocsPanel.openedvstuplenie} type="openedvstuplenie"/>
          <DocsPanel text={Strings.DocsPanel.openedtitul} type="openedtitul"/>
          <DocsPanel text={Strings.DocsPanel.openedregister} type="openedregister"/>
          <DocsPanel text={Strings.DocsPanel.openedvyazka} type="openedvyazka"/>
          <DocsPanel text={Strings.DocsPanel.openedposition} type="openedposition"/>
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
