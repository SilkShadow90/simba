import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import styles from '../styles/Ex.module.css';

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
                <div className={styles.ex_card} style={image ? { background: `url(${image})`,backgroundSize:"cover", objectFit: 'cover' }: undefined}/>
                <div className={opacityBlock ? styles.ex_opacity : styles.ex_opacity_DisplayNone}>
                    <div className={styles.ex_title}>{title}</div>
                    <div className={styles.ex_description}>{text}</div>
                </div>
            </div>
        </Link>
    );
};

export default ExhibitionCard;
