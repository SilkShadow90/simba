import type { NextPage } from 'next';
import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from '../styles/Home.module.css';
import { Strings } from '../resources';
import { Page } from '../components/Page';
import { Intro } from '../components/Intro';
import { Slider } from '../components/Slider';
import showcat from '../public/showcat.jpg';
import kittens from '../public/kittens.jpg';
import catteries from '../public/catteries.jpg';
import wch from '../public/wch.jpg';
import { Faq } from '../components/Faq';
import { NavigationCard } from '../components/NavigationCard';
import { JoinSteps } from '../components/JoinSteps';

import catzz from '../public/catzz.jpg';
import fish from '../public/fish.jpg';
import cosmo from '../public/cosmo.jpg';
import forest from '../public/forest.jpg';
import grass from '../public/list.jpg';

const Home: NextPage = () => {
  const sliderImageList = useMemo(() => [
    catzz,
    fish,
    cosmo,
    forest,
    grass,
  ], []);

  return (
    <Page title="Home" meta="bla bla" styles={styles.container}>
      <Slider images={sliderImageList} />
      <div className={styles.title}>{Strings.main.title}</div>
      <div className={styles.info}>
        <div className={styles.infoOver}>
          <div className={classNames(styles.column, styles.leftColumnText)}>
            {Strings.main.text.map(text => (
              <div key={text}>
                {text}
              </div>
            ))}
          </div>
          <div className={classNames(styles.column, styles.rightColumnText)}>
            <div>
              {Strings.main.textRight}
            </div>
            <div>
              {Strings.main.textRightOne.map(text => (
                <div key={text}>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <NavigationCard title={'Выставки'} image={showcat} url={'exhibitions'} />
          <NavigationCard title={'Кошки'} image={kittens} url={'cats'} />
          <NavigationCard title={'Питомники'} image={catteries} url={'nurseries'} />
          <NavigationCard title={'Документы'} image={wch} url={'docs'} />
        </div>
        <Intro />
        <JoinSteps />
        <div className={styles.title}>{Strings.main.faq}</div>
        <div className={styles.faqWrapper}>
          <Faq />
        </div>
      </div>
    </Page>
  );
};

export default Home;
