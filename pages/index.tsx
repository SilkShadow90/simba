import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from "react";
import simba from '../public/simba.jpeg';
import cat from '../public/cat.jpg';
import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import { Strings } from '../resources';
import {Page} from "../components/Page";

const Home: NextPage = () => {
  return (
      <Page title="Home" meta="bla bla" styles={styles.container}>
          <div className={styles.titleList}>
              Слайдер
          </div>
          <div className={styles.infoUpper}>{Strings.main.title}</div>
          <div className={styles.info}>
              <div className={styles.infoOver}>
                  <div className={styles.column}>
                      {Strings.main.text.map(text => (
                          <div key={text} className={styles.leftColumnText}>
                              {text}
                          </div>
                      ))}
                  </div>
                  <div className={styles.column}>
                          <div className={styles.rightColumnText}>
                              Актуальное
                          </div>
                          <div className={styles.rightColumnText}>
                              15 марта 2021 | Ближайшие выставки
                          </div>
                          <div className={styles.rightColumnText}>

                              Приглашаем принять участие в Международной выставке кошек 06-07 марта 2022 г
                              License L# 221052 Место проведения: ВВЦ, ТЦ РМ, 1-я Останкинская ул. 55 Схема прохода и
                              проезда Эксперты: Mrs. Tatyana Terе...
                          </div>
                          <div className={styles.rightColumnText}>
                              10 октября 2020 | Прошедшие выставки
                          </div>
                          <div className={styles.rightColumnText}>
                              10-11 октября 2020 г, прошла Международная выставка кошек РФОО Коргоруши, Москва
                          </div>
                          <div className={styles.rightColumnText}>
                              25 января 2020 | Прошедшие выставки
                          </div>
                          <div className={styles.rightColumnText}>
                              25-26 января 2020г, прошла Международная выставка кошек памяти Людмилы Есиной, РФОО Коргоруши, Москва, парк Сокольники
                          </div>
                          <div className={styles.rightColumnText}>
                              Все новости
                          </div>
                  </div>
              </div>
              <div className={styles.razdel}>
                  <div className={styles.razdelRow}>
                      <div className={styles.razdelCardleft}></div>
                      <div className={styles.razdelCardleft}></div>
                  </div>
                  <div className={styles.razdelColumn}>
                      <div className={styles.razdelCardRight}>
                          {/*<Image className={styles.art}  sizes={"1"} src={cat}/>*/}
                      </div>
                      <div className={styles.razdelCardRight}>
                          {/*<Image  src={simba}/>*/}
                          {/*<img src={simba} alt="s"/>*/}
                      </div>
                  </div>
              </div>
              <div className={styles.razdelDown}>
                  123
              </div>
              <div className={styles.razdelCenter}>
                  <div className={styles.razdelCenterBlock}>ledt block</div>
                  <div className={styles.razdelCenterBlock}>right block</div>
              </div>
          </div>
    </Page>
  )
}

export default Home
