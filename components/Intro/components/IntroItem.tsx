import React, { PropsWithChildren } from 'react';
import Image from 'next/image';
import styles from '../../../styles/Intro.module.css';

interface Props {
  title: string;
  text: string;
  src: any;
}

export const IntroItem = ({ title, text, src }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.wrapperDownBlock}>
      <div className={styles.imageBlock}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src={src}/>
      </div>
      <div className={styles.wrapperDownBlockText}>
        <div className={styles.wrapperDownBlockTextTitle}>{title}</div>
        <span>{text}</span>
      </div>
    </div>
  );
};
