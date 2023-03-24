import React, {useState} from 'react';
import {AdminInputTab, IDObject, Titles} from "./AdminInputTab";
import styles from "../../styles/adminStyles/Admin.module.css";
import Image from "next/image";
import deleteSrc from "../../public/adminImg/menu/delete.svg";
import {AdminCheckbox} from "./AdminCheckbox";
import {Text} from "./Text";

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

    const allChecked = checkedList.length === items.length || checkedList.length

    const toggleAll = () => {
        setCheckedList((prevState) => {
            if(prevState.length === items.length) {
                return []
            }
            return items.map(item => item.id)
        })
    }

    const getGridSize = ():string => Object.keys(titles)
        .map((key) => {
            if (typeof items[0][key as keyof T]  === 'string') {
                return "1fr"
            }
            if (typeof items[0][key as keyof T] === 'boolean') {
                return "100px"
            }
            return "1fr"
        }).join(" ")


    return (
        <div>
            <div className={styles.admin_Input_Tab} style={{ display: 'grid', gridTemplateColumns:allChecked ? "1fr" : `100px ${getGridSize()} 60px 60px` }}>
                {!allChecked ? (
                    <>
                        <div className={styles.admin_input_tab_checked}>
                            <AdminCheckbox type={!allChecked ? "unchecked" : "checked"} onClick={toggleAll}/>
                            {/*<input type="checkbox" onClick={toggleAll} checked={allChecked} />*/}
                        </div>

                        {Object.values(titles).map((value) => (
                            <div>{value}</div>
                        ))}
                    </>
                ) : (
                    <>
                        <div className={styles.admin_input_tab_checked}>
                            <div className={styles.admin_input_tab_checked_box}>
                                <AdminCheckbox type={allChecked ? "checked" : "unchecked"} onClick={toggleAll}/>
                                <div className={styles.admin_input_tab_checked_boxStyle}>
                                    {checkedList.length} <Text size={"small"} color={"black"} text={"Selected"}/>
                                </div>
                                <button className={styles.admin_input_tab_checked_boxStyleButton}>
                                    <Image  className={styles.adminCardsLeft_input_position_img} objectFit={"cover"}  src={deleteSrc} />
                                </button>
                            </div>
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