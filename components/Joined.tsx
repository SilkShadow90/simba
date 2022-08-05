import styles from "../styles/Joined.module.css";
import React, {PropsWithChildren, useState} from "react";
import Image from "next/image";
import { Strings } from '../resources';
import iconCat from "../public/iconCat.png";
import iconCatTwo from "../public/iconCatTwo.png";
import iconCatThree from "../public/iconCatThree.png";
import iconCatFour from "../public/iconCatFour.png";


export const Join = () => {
    return (
            <div className={styles.join}>
                <div className={styles.joinUpper}>Как вступить в клуб Симба</div>
                <div className={styles.joinDown}>
                    <div className={styles.joinDownBox}>
                        <div className={styles.joinDownBoxImg}>
                            <div className={styles.joinDownBoxImgNumber}>1.</div>
                            <Image className={styles.joinDownBoxImgSize} layout={"intrinsic"} objectFit="cover" src={iconCat}/>
                        </div>
                        <span>{Strings.Join.textOne}</span>
                    </div>
                    <div className={styles.joinDownBox}>
                        <div className={styles.joinDownBoxImg}>
                            <div className={styles.joinDownBoxImgNumber}>2.</div>
                            <Image className={styles.joinDownBoxImgSize} layout={"intrinsic"} objectFit="cover" src={iconCatTwo}/>
                        </div>
                        <span>{Strings.Join.textTwo}</span>
                    </div>
                    <div className={styles.joinDownBox}>
                        <div className={styles.joinDownBoxImg}>
                            <div className={styles.joinDownBoxImgNumber}>3.</div>
                            <Image className={styles.joinDownBoxImgSize} layout={"intrinsic"} objectFit="cover" src={iconCatThree}/>
                        </div>
                        <span>{Strings.Join.textThree}</span>
                    </div>
                    <div className={styles.joinDownBox}>
                        <div className={styles.joinDownBoxImg}>
                        <div className={styles.joinDownBoxImgNumber}>4.</div>
                        <Image className={styles.joinDownBoxImgSize} layout={"intrinsic"} objectFit="cover" src={iconCatFour}/>
                    </div>
                        <div className={styles.joinDownBoxCongratulation}>Поздравляем!</div>
                        <span>{Strings.Join.textFour}</span>
                    </div>
                </div>
            </div>
    )
}