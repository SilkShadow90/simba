import React, {useMemo} from "react";
import classNames from 'classnames';
import styles from "../../styles/adminStyles/InputArea.module.css";
import {Text} from "./Text";



interface Props {
    text?:string;
    height?:number;
    width?:number;
    placeholder:string;
    placeholderColor:string;
}

export const InputArea = ({text, placeholder, height=1, width=50, placeholderColor}:Props) => {
    const colorPlaceholder = useMemo(
        ():string => {
            switch (placeholderColor) {
                case "black" :
                    return styles.placeholder_color_black;
                case "blue" :
                    return styles.placeholder_color_blue;
                case "gray" :
                    return styles.placeholder_color_gray;
                default:
                    return styles.placeholder_color_black;
            }
        },
        [placeholderColor],
    );
    return (
        <div className={styles.areaMain}>
            <div className={styles.areaMain_Title}>
                <Text size={"high"} color={"gray"} text={"Title"}/>
            </div>
            <textarea placeholder={placeholder}
                      className={classNames(styles.areaStyle, colorPlaceholder)}
                      wrap={"soft"}
                      rows={height}
                      cols={width}
            >
                {text}
            </textarea>
            <div className={styles.areaMain_borderBottom}/>
        </div>
    );
};