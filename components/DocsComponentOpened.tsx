
import React from "react";
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';



export const DocsComponentOpened:any = () => {

    return (
        <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>{Strings.docsStart.title}</div>
                <div className={styles.docsRightMain}>{Strings.docsStart.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.docsStart.info}</div>
            <ul className={styles.docsRightUL}>
            {Strings.docsStart.li.map(text => (
                <li key={text} className={styles.docsLi}>{text}</li>))}
            </ul>
            <button className={styles.docsButton}>Скачать заявление на вступление в клуб</button>
        </div>
    );
};
