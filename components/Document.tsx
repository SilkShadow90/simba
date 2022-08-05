import styles from "../styles/Docs.module.css";
import React, {PropsWithChildren, useState} from "react";


interface Props {
    docs: string;
    text: string;
}

export const Document = ({docs,text}: PropsWithChildren<Props>) => {
    const  [style, setStyle] = useState(true);
    return (
            <button className={style ? styles.cardsDocsInfo : styles.cardsDocsInfoHeight } onClick={() => setStyle(prevstate => !prevstate)}>
                <a  target='_blank' download href={docs}>{text}</a>
                <div>123123</div>
            </button>
    )
}