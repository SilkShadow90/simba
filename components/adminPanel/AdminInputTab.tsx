import React, {useState} from 'react';
import styles from "../../styles/adminStyles/Admin.module.css";
import {AdminCheckbox} from "./AdminCheckbox";
import {AdminModal} from "./AdminModal";
import Image from "next/image";
import edit from  "../../public/adminImg/other/edit.svg";
import deleteIcon from  "../../public/adminImg/other/delete.svg";


type ID = string
export type IDObject = { id: ID }

export type Titles<T> = Partial<Record<keyof T, string>>


export type AdminTabProps<T> = {
    titles: Titles<T>
    item: T
    checked?:boolean;
    onClick?():any;
}

export const AdminInputTab = <T extends IDObject>({ item, titles, checked ,onClick }: AdminTabProps<T>) => {

    const [modalActive,setModalActive] = useState(false)

    const toggleModal = () => {
        setModalActive((prevState)=> !prevState)
    }

    const getGridSize = ():string => Object.keys(titles)
            .map((key) => {
                if (typeof item[key as keyof T]  === 'string') {
                    return "1fr"
                }
                if (typeof item[key as keyof T] === 'boolean') {
                    return "100px"
                }
                return "1fr"
            }).join(" ")



    return (

        <div className={styles.admin_Input_Tab}  style={{ display: 'grid', gridTemplateColumns:`100px ${getGridSize()} 60px 60px`}}>
            <div className={styles.admin_input_tab_checked}>
                <AdminCheckbox type={checked ? "checked" : "unchecked"} onClick={onClick} />
            </div>
            {Object.keys(titles)
                .map((key) => {
                    if (typeof item[key as keyof T]  === 'string') {
                        return (
                            <div>{item[key as keyof T] as any}</div>
                        )
                    }
                    if (typeof item[key as keyof T] === 'boolean') {
                        return (
                            <div className={styles.admin_input_tab_checked_boolean}>
                                <AdminCheckbox type={item[key as keyof T]as any ? "checked" : "unchecked"}/>
                                {/*<input type="checkbox"  checked={item[key as keyof T]as any} />*/}
                            </div>
                        )
                    }
                    return <div />
                })}
            <AdminModal item={item} titles={titles} active={modalActive} setActive={setModalActive}/>
            <button className={styles.adminTab_edit} onClick={toggleModal}>
                <Image className={styles.adminCardsLeft_input_position_img} objectFit={"cover"}  src={edit} />
            </button>
            <button className={styles.adminTab_edit} >
                <Image className={styles.adminCardsLeft_input_position_img} objectFit={"cover"}  src={deleteIcon} />
            </button>
        </div>
    )
};