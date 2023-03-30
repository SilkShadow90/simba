import React from 'react';
import { Strings } from '../../resources';
import styles from '../../styles/Intro.module.css';
import show from '../../public/show.png';
import kits from '../../public/kits.png';
import doc1 from '../../public/doc1.png';
import study from '../../public/study.png';
import consult from '../../public/consult.png';
import { IntroItem } from './components/IntroItem';

export const Intro = () => {
  return (
    <div className={styles.wrapperDown}>
      <div className={styles.wrapperDownMain}>{Strings.intro.title}</div>
      <div className={styles.wrapperDownMainIntro}>
        <IntroItem src={show} title={Strings.intro.one.title} text={Strings.intro.one.text}/>
        <IntroItem src={kits} title={Strings.intro.two.title} text={Strings.intro.two.text}/>
        <IntroItem src={doc1} title={Strings.intro.three.title} text={Strings.intro.three.text}/>
        <IntroItem src={doc1} title={Strings.intro.four.title} text={Strings.intro.four.text}/>
        <IntroItem src={study} title={Strings.intro.five.title} text={Strings.intro.five.text}/>
        <IntroItem src={consult} title={Strings.intro.six.title} text={Strings.intro.six.text}/>
      </div>
    </div>

  );
};
