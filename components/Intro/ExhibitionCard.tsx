import React, {PropsWithChildren} from 'react';
import styles from '../../styles/Ex.module.css';
import Link from 'next/link';

interface Props {
    title: string;
    text: string;
    csssrc: string;
    link: string;
}

const ExhibitionCard = ({ title, text,  csssrc, link }: PropsWithChildren<Props>) => {
    return (
        <Link href={link}>
            <div className={styles.ex}>
                <div className={csssrc} style={{ margin: 0 }}/>
                <div className={styles.ex_opacity}>
                    <div className={styles.exhibition_Main__cardTitle}>{title}</div>
                    <div className={styles.exhibition_Main__cardText}>{text}</div>
                </div>
            </div>
        </Link>
    )
}

export default ExhibitionCard;
