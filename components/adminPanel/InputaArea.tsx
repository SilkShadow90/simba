import React, {useMemo, useRef, useState} from "react";
import classNames from 'classnames';
import styles from "../../styles/adminStyles/InputArea.module.css";
import {Text} from "./Text";




interface Props {
    text?:string;
    height?:number;
    width?:number;
    placeholder:string;
    placeholderColor?:string;
}

export const InputArea = ({text, placeholder, height=1, width=50, placeholderColor="gray"}:Props) => {

    const [focused, setFocused] = useState(false);

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
                    return styles.placeholder_color_gray;
            }
        },
        [placeholderColor],
    );
    return (
        <div className={styles.areaMain}>
            <div className={styles.areaMain_Title}>
                <Text size={"small"} color={focused ? "blue" : "gray"} text={text ? placeholder : ""}/>
            </div>
            <textarea
                onFocus={()=>setFocused(true)}
                onBlur={()=>setFocused(false)}
                onChange={event => console.log(event.target.value)}
                placeholder={placeholder}
                className={classNames(styles.areaStyle,!text && colorPlaceholder )}
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