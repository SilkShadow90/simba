import React from "react";
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';

interface Props {
    text: string;
    type: string;
    value:any;
    onChange:any;
  }


export const DocsComponentInput:any = ({text, type, value, onChange}:Props) => {

    return (
        <>
            <div className={styles.docsPreSelect}>{text}</div>
            <input className={styles.docsSelect}  onChange={onChange} value={value} type={type}/>
        </>
    )
};