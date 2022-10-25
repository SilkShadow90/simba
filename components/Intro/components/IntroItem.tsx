import React, { PropsWithChildren } from 'react';
import styles from '../../../styles/Intro.module.css';
import Image from 'next/image';

interface Props {
  title: string;
  text: string;
  src: any;
}

export const IntroItem = ({ title, text, src }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.razdelDownBlock}>
      <div className={styles.imageBlock}>
        <Image src={src}/>
      </div>
      <div className={styles.razdelDownBlockText}>
        <div className={styles.razdelDownBlockTextTitle}>{title}</div>
        <span>{text}</span>
      </div>
    </div>
  );
};
