import styles from "../styles/Back.module.css";
import React, {PropsWithChildren} from "react";
import Link from 'next/link';

interface Props {
    // name: string;
    // image: any;
    // family: string;
    // years: string;
    link: string;
}
// {image,name,family,years }: PropsWithChildren<Props>
export const FirstBack:any = ({ link }: PropsWithChildren<Props>) => {
    return (
        <>
            <Link href={link}>
                <div className={styles.back}>Назад</div>
            </Link>
        </>
    )
};