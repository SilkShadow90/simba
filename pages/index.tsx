import type { NextPage } from 'next';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Strings } from '../resources';
import { Page } from '../components/Page';
import { Join } from '../components/Joined';
import { Intro } from '../components/Intro';
import SimpleSlider from '../components/Slider';
import showcat from '../public/showcat.jpg';
import kittens from '../public/kittens.jpg';
import catteries from '../public/catteries.jpg';
import wch from '../public/wch.jpg';
import { useFetchService } from '../utils/useFetchService';
import FaqMethods from '../api/FaqMethods';
import InfoMethods from '../api/InfoMethods';
import { Info } from '../api/types';

const Home: NextPage = () => {
  const { data: faqData, loading: faqLoading } = useFetchService(FaqMethods.getAll);
  const { data: infoData, loading: infoLoading } = useFetchService(InfoMethods.getRecord);

  return (
    <Page title="Home" meta="bla bla" styles={styles.container} isLoading={faqLoading || infoLoading}>
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
              <Image src={showcat} layout="fill" objectFit="cover"/>
              <div className={styles.razdelCardLine}>
                <span>Выставки</span>
              </div>
            </div>
            <div className={styles.razdelCardleft}>
              <Image src={kittens} layout="fill" objectFit="cover"/>
              <div className={styles.razdelCardLine}>
                <span>Котята</span>
              </div>
            </div>
          </div>
          <div className={styles.razdelColumn}>
            <div className={styles.razdelCardRight}>
              <Image src={catteries} layout="fill" objectFit="cover"/>
              <div className={styles.razdelCardLine}>
                <span>Питомника</span>
              </div>
            </div>
            <div className={styles.razdelCardRight}>
              <Image src={wch} layout="fill" objectFit="cover"/>
              <div className={styles.razdelCardLine}>
                <span> Чемпионы</span>
              </div>
            </div>
          </div>
        </div>
        <Intro/>
        <div className={styles.razdelCenter}>
          {/* Вынести в стринги (возможно в отдельный компонент) */}
          {faqData && faqData.map((faq) => (
            <div className={styles.razdelCenterBlockLeft} key={faq.title}>
              <div className={styles.razdelCenterBlockTextMain}>{faq.title}</div>
              <div>{faq.description}</div>
              {faq.points?.length && (
                <ul>
                  {faq.points.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              )}
              <div>{infoData && (infoData as unknown as Info).faqText}</div>
            </div>
          ))}
        </div>
        <Join/>
        <div className={styles.Block}>
          <div className={styles.Block_Line}>
            <div className={styles.kvadro}>
              <div className={styles.kvadro_rotate}>123123</div>
            </div>
            <div className={styles.kvadro_one}></div>
            <div className={styles.kvadro_two}></div>
            <div className={styles.kvadro_three}></div>
            <div className={styles.kvadro_four}></div>
          </div>
        </div>

      </div>
    </Page>
  );
};

export default Home;
