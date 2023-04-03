import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Ex.module.css';
import { isProd } from '../utils';

interface Props {
    title: string;
    text: string;
    link: string;
    image?: string
    opacityBlock?:boolean
    hoverBlock?:boolean
}

const ExhibitionCard = ({ title, text, link, image, opacityBlock, hoverBlock }: PropsWithChildren<Props>) => {
    return (
        <Link href={link}>
            <div className={hoverBlock ? styles.ex : styles.ex_noHover}>
                {image && (
                  <div className={styles.ex_card}>
                      {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image placeholder={'blur'} blurDataURL={`${isProd() ? '/simba' : ''}${image}`} src={`${isProd() ? '/simba' : ''}${image}`} objectFit={'cover'} layout={'fill'} />
                  </div>
                )}
                <div className={opacityBlock ? styles.ex_opacity : styles.ex_opacity_DisplayNone}>
                    <div className={styles.ex_title}>{title}</div>
                    <div className={styles.ex_description}>{text}</div>
                </div>
            </div>
        </Link>
    );
};

export default ExhibitionCard;
