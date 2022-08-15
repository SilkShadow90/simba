import styles from "../styles/Joined.module.css";
import React, {PropsWithChildren, useState} from "react";
import Image, { StaticImageData } from 'next/image';
import { Strings } from '../resources';
import iconCat from "../public/iconCat.png";
import iconCatTwo from "../public/iconCatTwo.png";
import iconCatThree from "../public/iconCatThree.png";
import iconCatFour from "../public/iconCatFour.png";

const icons = [
    iconCat,
    iconCatTwo,
    iconCatThree,
    iconCatFour,
]

const slide = (data: string | { title: string, text: string }, index: number) => {
    const dataIsString = typeof data === 'string'

    return (
      <div className={styles.joinDownBox}>
          <div className={styles.joinDownBoxImg}>
              <div className={styles.joinDownBoxImgNumber}>{index + 1}.</div>
              {!!icons[index] && (
                <Image className={styles.joinDownBoxImgSize} layout={"intrinsic"} objectFit="cover" src={icons[index]}/>
              )}
          </div>

          {dataIsString && (
            <span>{data}</span>
          )}
          {!dataIsString && (
            <>
                <div className={styles.joinDownBoxCongratulation}>{data.title}</div>
                <span>{data.text}</span>
            </>
          )}
      </div>
    )
}

export const Join = () => {
    return (
            <div className={styles.join}>
                <div className={styles.joinUpper}>{Strings.joinClub.title}</div>
                <div className={styles.joinDown}>
                    {Strings.joinClub.slides.map(slide)}
                </div>
            </div>
    )
}
