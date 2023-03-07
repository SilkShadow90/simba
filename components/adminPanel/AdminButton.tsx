import React, {useMemo} from "react";
import styles from "../../styles/adminStyles/AdminButton.module.css";

interface Props {
    text: string;
    onClick(): void;
    type?: "primary" | "secondary" | "other";
}

export const AdminButton = ({text,onClick,type}:Props) => {


    const [buttonStyle,textStyle] = useMemo(
     ():[string,string] => {
            switch (type) {
                case "primary" :
                    return [styles.main_button_primary, styles.main_button_text_primary];
                case "secondary" :
                    return [styles.main_button_secondary, styles.main_button_text_secondary]
                case "other" :
                    return [styles.main_button_other, styles.main_button_text_other]
                default:
                    return [styles.main_button_primary, styles.main_button_text_primary]
            }
        },
        [type],
    );

    return (
        <button className={buttonStyle} color={""} onClick={onClick} >
            <div className={textStyle}>{text}</div>
        </button>
    );
};

