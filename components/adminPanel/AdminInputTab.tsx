import React from 'react';
import styles from "../../styles/adminStyles/Admin.module.css";

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

    return (

        <div className={styles.admin_Input_Tab} style={{ display: 'grid', gridTemplateColumns:`repeat(${Object.values(titles).length +1},1fr)`}}>
            <div className={styles.admin_input_tab_checked}>
                <input type="checkbox" onClick={onClick} checked={checked} />
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
                            <div className={styles.admin_input_tab_checked}>
                                <input type="checkbox"  checked={item[key as keyof T]as any} />
                            </div>
                        )
                    }

                    return <div />
                })}
        </div>
    )
};