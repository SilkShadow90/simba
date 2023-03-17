import React, {useState} from 'react';
import {AdminInputTab, IDObject, Titles} from "./AdminInputTab";
import styles from "../../styles/adminStyles/Admin.module.css";

export type AdminListProps<T> = {
    titles: Titles<T>
    items: T[]
}

export const AdminInputList = <T extends IDObject>({ titles, items }: AdminListProps<T>) => {
    const [checkedList, setCheckedList] = useState<string[]>([])
    const toggle = (id:string) => () => setCheckedList((prevState) => {
        if(prevState.includes(id)) {
            return prevState.filter((value) => value !== id)
        }
        return prevState.concat(id)
    })
    console.log(checkedList)

    const allChecked = checkedList.length === items.length

    const toggleAll = () => {
        setCheckedList((prevState) => {
            if(prevState.length === items.length) {
                return []
            }
            return items.map(item => item.id)
        })
    }

    return (
        <div>
            <div className={styles.admin_Input_Tab} style={{ display: 'grid', gridTemplateColumns:`repeat(${Object.values(titles).length +1},1fr)`,}}>
                {!allChecked ? (
                    <>
                        <div className={styles.admin_input_tab_checked}>
                            <input type="checkbox" onClick={toggleAll} checked={allChecked} />
                        </div>
                        {Object.values(titles).map((value) => (
                            <div>{value}</div>
                        ))}
                    </>
                ) : (
                    <>
                        <div className={styles.admin_input_tab_checked}>
                            <input type="checkbox" onClick={toggleAll} checked={allChecked} />
                        </div>
                    </>
                )}
            </div>
            {items.map((item) => (
                <AdminInputTab checked={checkedList.includes(item.id)} onClick={toggle(item.id)} key={item.id} item={item} titles={titles} />
            ))}
        </div>
    )
}