import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import React, {useState} from "react";
import { Strings } from '../resources';
import {Page} from "../components/Page";
import {Join} from "../components/Joined";
import { Intro } from '../components/Intro';
import SimpleSlider from "../components/Slider";
import showcat  from '../public/showcat.jpg';
import kittens  from '../public/kittens.jpg';
import catteries  from '../public/catteries.jpg';
import wch  from '../public/wch.jpg';
import Image from "next/image";
import Loader from "../components/Loader";

const Home: NextPage = () => {

  return (
      <Page title="Home" meta="bla bla" styles={styles.container}>
        <SimpleSlider/>
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
                              {Strings.main.textRight}
                          </div>
                          <div className={styles.rightColumnText}>
                              {Strings.main.textRightOne.map(text => (
                                  <div key={text} className={styles.rightColumnText}>
                                      {text}
                                  </div>
                              ))}
                          </div>
                  </div>
              </div>
              <div className={styles.razdel}>
                  <div className={styles.razdelRow}>
                      <div className={styles.razdelCardleft}>
                          <Image src={showcat} layout="fill" objectFit="cover" />
                              <div className={styles.razdelCardLine}>
                                  Выставки
                              </div>
                      </div>
                      <div className={styles.razdelCardleft}>
                          <Image src={kittens} layout="fill" objectFit="cover"/>
                          <div className={styles.razdelCardLine}>
                              Котята
                          </div>
                      </div>
                  </div>
                  <div className={styles.razdelColumn}>
                      <div className={styles.razdelCardRight}>
                          <Image src={catteries} layout="fill" objectFit="cover" />
                          <div className={styles.razdelCardLine}>
                              Питомника
                          </div>
                      </div>
                      <div className={styles.razdelCardRight}>
                          <Image src={wch} layout="fill" objectFit="cover" />
                          <div className={styles.razdelCardLine}>
                              Чемпионы
                          </div>
                      </div>
                  </div>
              </div>
              <Intro/>
              <div className={styles.razdelCenter}>
                  {/*Вынести в стринги (возможно в отдельный компонент)*/}
                  <div className={styles.razdelCenterBlockLeft}>
                      <div className={styles.razdelCenterBlockTextMain}>{Strings.infoCats.leftColumn.title}</div>
                      <div>{Strings.infoCats.leftColumn.info}</div>
                      <ul>
                          {Strings.infoCats.leftColumn.li.map((text)=>(
                              <li key={text}>{text}</li>
                          ))}
                      </ul>
                      <div>{Strings.infoCats.leftColumn.lost}</div>
                  </div>
                  <div className={styles.razdelCenterBlockRight}>
                      <div className={styles.razdelCenterBlockTextMain}>{Strings.infoCats.rightColumn.title}</div>
                      <div>{Strings.infoCats.rightColumn.info}</div>
                    <ul>
                        {Strings.infoCats.rightColumn.li.map((text)=>(
                            <li key={text}>{text}</li>
                        ))}
                    </ul>
                      <div>{Strings.infoCats.rightColumn.lost}</div>
                  </div>
              </div>
              <Join/>
          </div>
    </Page>
  )
}

export default Home
