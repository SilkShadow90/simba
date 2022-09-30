import styles from "../styles/Back.module.css";
import React, {PropsWithChildren} from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
    // name: string;
    // image: any;
    // family: string;
    // years: string;
    link: string;
}
// {image,name,family,years }: PropsWithChildren<Props>
export const FirstBack:any = ({ link }: PropsWithChildren<Props>) => {
  const router = useRouter()

  return (
    <button style={{ border: 'none', padding: 0, backgroundColor: 'transparent' }} onClick={router.back}>
      <div className={styles.back}>&larr;</div>
    </button>
  )
};
