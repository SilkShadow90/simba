import React, {useMemo} from "react";
import classNames from 'classnames';
import styles from "../../styles/adminStyles/Text.module.css";


interface Props {
    text:string;
    size:"high" | "medium" | "small";
    color?:"black" | "blue" | "gray" | "darkGray"| "darkBlack";
}

export const Text = ({text, size, color = "black"}:Props) => {

    const fontStyle = useMemo(
        ():string => {
            switch (size) {
                case "medium" :
                    return styles.text_size_medium;
                case "small" :
                    return styles.text_size_small;
                case "high" :
                default:
                    return styles.text_size_high;
            }
        },
        [size],
    );

    const colorStyle = useMemo(
        ():string => {
            switch (color) {
                case "blue" :
                    return styles.text_color_blue;
                case "gray" :
                    return styles.text_color_gray;
                case "darkBlack" :
                    return styles.text_color_tableBlack;
                case "darkGray" :
                    return styles.text_color_darkGray;
                case "black" :
                default:
                    return styles.text_color_black;
            }
        },
        [color],
    );
    return (
        <span className={classNames(fontStyle, colorStyle)}>{text}</span>
    );
};