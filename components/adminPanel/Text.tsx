import React from "react";
import styles from "../../styles/adminStyles/AdminButton.module.css";


interface Props {
    text:string;
    size?:number;
    color?:string;
}

export const Text = ({text,size=15,color="#323C47"}:Props) => {

    return (
        <span style={{fontSize:`${size}px`,color:`${color}`}}>{text}</span>
    );
};