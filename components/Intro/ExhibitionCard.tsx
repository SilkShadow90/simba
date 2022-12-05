import React, {PropsWithChildren} from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from '../../styles/Ex.module.css';

interface Props {
    title: string;
    text: string;
    csssrc: string;
    link: string;
    image?: string
}

const ExhibitionCard = ({ title, text,  csssrc, link, image }: PropsWithChildren<Props>) => {
    console.log(image);
    return (
        <Link href={link}>
            <div className={styles.ex}>
                <div className={classNames(csssrc, styles.cardMargin)} style={image ? { background: `url(${image})` }: undefined}/>
                <div className={styles.ex_opacity}>
                    <div className={styles.exhibition_Main__cardTitle}>{title}</div>
                    <div className={styles.exhibition_Main__cardText}>{text}</div>
                </div>
            </div>
        </Link>
    );
};

export default ExhibitionCard;
