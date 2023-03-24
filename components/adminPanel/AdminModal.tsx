import React, {useMemo, useState} from "react";
import styles from "../../styles/adminStyles/AdminModal.module.css";
import {IDObject, Titles} from "./AdminInputTab";
import {AdminCheckbox} from "./AdminCheckbox";
import {InputArea} from "./InputaArea";

interface Props<T> {
    text?: string;
    onClick?(): void;
    type?: "primary" | "secondary" | "other";
    active:any;
    setActive(T: any): any;
    item: T ;
    titles: Titles<T>
}

export const AdminModal = <T extends IDObject>({active, setActive ,item, titles}:Props<T>) => {

    return (
        <>
            <div className={active ? styles.modal_container : styles.modal_none}>
                <div className={active ? styles.modal : styles.modal_none }  onClick={() => setActive(false)} />
                <div onClick={(e) => e.stopPropagation} className={styles.modal_main}>
                    {Object.entries(titles)
                        .map(([key,value]) => {
                            if (typeof item[key as keyof T]  === 'string') {
                                return (
                                    <>
                                        <InputArea placeholder={value}  text={item[key as keyof T] as any}/>
                                    </>
                                )
                            }
                            if (typeof item[key as keyof T] === 'boolean') {
                                return (
                                    <div className={styles.admin_input_tab_checked_boolean}>
                                        <div>{value}</div>
                                        <AdminCheckbox type={item[key as keyof T]as any ? "checked" : "unchecked"}/>
                                    </div>
                                )
                            }
                            return <div />
                        })}

                </div>
            </div>
        </>
    );
};

