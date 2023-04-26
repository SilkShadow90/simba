import React, {useMemo} from "react";
import Image from "next/image";
import styles from "../../styles/adminStyles/AdminCheckbox.module.css";
import checkWhite from "../../public/adminImg/checkbox/chekmarkWhite.svg";
import checkGray from "../../public/adminImg/checkbox/chekmarkGray.svg";
import checkGreen from "../../public/adminImg/checkbox/chekmarkGreen.svg";
import warning from "../../public/adminImg/checkbox/warning.svg";
import unchecked from "../../public/adminImg/checkbox/unchecked.svg";
import fill from "../../public/adminImg/checkbox/fill.svg";
import {util} from "protobufjs";
import emptyArray = util.emptyArray;
import classNames from "classnames";

interface Props {
    onClick?(): void;
    // typeImage?: "checkWhite" | "checkGray" | "checkGreen" | "warning" | "unchecked" | "number";
    type?: "default" | "gray" | "green" | "red" | "fillBlue";
    count?:number;
}

export const AdminCheckbox = React.memo(({onClick,count,type}:Props) => {

  const checkboxBorder = useMemo(
    ():string => {
      switch (type) {

        case "default" :
          return  styles.borderDefault;
        case "fillBlue" :
          return styles.fillBlue
        case "gray" :
          return styles.borderDisabled
        case "green" :
          return styles.borderGreen
        case "red" :
          return styles.borderRed
        default:
          return styles.borderDefault
      }
    },
    [type],
  );

    const checkboxImage = useMemo(
        ():string => {
            switch (type) {

                case "fillBlue" :
                    return checkWhite;
                case "gray" :
                    return checkGray
                case "green" :
                    return checkGreen
                case "red" :
                    return warning
                default:
                    return ""
            }
        },
        [type],
    );

    if (count) {
return (
        <button className={classNames(styles.checkboxTemplate, checkboxBorder)} onClick={onClick}>
            <div className={styles.buttonNumberCheckbox}>{count}</div>
        </button>
    )
}

    return (
      <button className={classNames(styles.checkboxTemplate, checkboxBorder)} onClick={onClick}>
        {
          !!checkboxImage && (
            <Image className={styles.buttonImage} objectFit={"contain"} layout={"fixed"} src={checkboxImage}/>
          )
        }
      </button>
    );
});

