import type { NextPage } from 'next'
import React, {PropsWithChildren} from 'react';
import styles from '../../styles/Ex.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    title: string;
    text: string;
    css: string;
    csstwo: string;
    link: string;
}

const ExhibitionCard = ({ title, text, css, csstwo, link }: PropsWithChildren<Props>) => {
    return (
        <Link href={link}>
            <div className={css} style={{ position: 'relative', minHeight: 'auto', overflow: 'hidden', transition: 'all 200ms linear', border: 'none' }}>
                <div className={csstwo} style={{ margin: 0 }}/>
                <div style={{ position: 'absolute', background: '#ffffffbb', bottom: 0, left: 0, right: 0, height: '6rem' }}>
                    <div className={styles.exhibition_Main__cardTitle}>{title}</div>
                    <div className={styles.exhibition_Main__cardText}>{text}</div>
                </div>
            </div>
        </Link>
    )
}

export default ExhibitionCard;
