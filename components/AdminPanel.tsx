import styles from "../styles/Admin.module.css";
import React, {PropsWithChildren, useState} from "react";


interface Props {
    text: string;
}

export const AdminPanel = ({text}: PropsWithChildren<Props>) => {
    const  [height, setHeight] = useState(true);
    return (
        <button className={height ? styles.adminCardsLeftColumn : styles.adminCardsLeftColumnRed } onClick={()=> setHeight((prevState)=> !prevState) } >{text}</button>
    )
}