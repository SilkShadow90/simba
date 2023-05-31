import React, {ChangeEvent} from "react";
import classNames from 'classnames';
import styles from "../../styles/adminStyles/AdminSearch.module.css";
import Image from "next/image";
import search from "../../public/adminImg/other/search.svg";
import notifications from "../../public/adminImg/other/notifications.svg";



interface Props {
  value:string;
  onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>):void;
}

export const AdminSearch = ({value, onChange }:Props) => {

   // const [searching, setSearching] = useState<string>('');

  return (
    <div className={styles.searchMain}>
      <Image className={styles.searchImage} objectFit={"contain"} src={search}/>
      <input type={"search"} placeholder={"Поиск"} value={value} onChange={onChange} className={styles.searchMainInput}/>
      <Image className={styles.searchImage} objectFit={"contain"} src={notifications}/>
    </div>
  );
};
