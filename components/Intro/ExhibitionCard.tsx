import type { NextPage } from 'next'
import React, {PropsWithChildren} from 'react';
import styles from '../../styles/Ex.module.css';

interface Props {
    title: string;
    text: string;
    css: string;
    csstwo: string;
    link: string;
}

const ExhibitionCard = ({ title, text, css, csstwo, link }: PropsWithChildren<Props>) => {
    return (
        <a href={link}>
            <div className={css}>
                <div className={csstwo}/>
                <div className={styles.exhibition_Main__cardTitle}>{title}</div>
                <div className={styles.exhibition_Main__cardText}>{text}</div>
            </div>
        </a>
    )
}

export default ExhibitionCard;