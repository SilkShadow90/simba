import React, {useMemo} from "react";
import Image from "next/image";
import styles from "../../styles/adminStyles/AdminCheckbox.module.css";
import unchecked from "../../public/adminImg/checkbox/unchecked.svg";
import sent from "../../public/adminImg/checkbox/sent+read.svg";
import disableSent from "../../public/adminImg/checkbox/sent.svg";
import error from "../../public/adminImg/checkbox/error.svg";
import checked from "../../public/adminImg/checkbox/checked.svg";

interface Props {
    onClick?(): void;
    type?: "unchecked" | "sent" | "disable" | "error" | "checked" ;
    count?:string;
}

export const AdminCheckbox = ({onClick,type,count}:Props) => {


    const [CheckboxSrc] = useMemo(
        ():[string] => {
            switch (type) {
                case "unchecked" :
                    return [unchecked];
                case "sent" :
                    return [sent]
                case "disable" :
                    return [disableSent]
                case "error" :
                    return [error]
                case "checked" :
                    return [checked]
                default:
                    return [unchecked]
            }
        },
        [type],
    );

    return (
        <button className={styles.buttonCheckbox} onClick={onClick}>
            <Image className={styles.adminCardsLeft_input_position_img} objectFit={"cover"} src={CheckboxSrc}/>
        </button>
    );
};

