import styles from "../styles/Cats.module.css";
import Image from "next/image";
import React, {PropsWithChildren} from "react";

interface Props {
    name: string;
    image: any;
    family: string;
    years: string;
}

export const Card = ({image,name,family,years }: PropsWithChildren<Props>) => {
    return (
        <div className={styles.cardsCatsPicture}>
            <div className={styles.cardsCatsPictureMain}>
                <div className={styles.cardsCatsPictureMainName}>{name}</div>
                <div className={styles.cardsCatsPictureMainFamily}>Порода: {family}</div>
                <div className={styles.cardsCatsPictureMainYears}>Возраст: {years}</div>
            </div>
            <Image layout="fill" objectFit="cover" src={image}/>
        </div>
    )
}