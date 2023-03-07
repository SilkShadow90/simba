import React, {useState} from 'react';
import styles from "../../styles/adminStyles/Admin.module.css";



interface Props {
    name:string;
    email: string;
    info: string;
    infotwo:string;
    procent:number;
    date:number;
    checked?:boolean
}

export const AdminInputTab = ({name, email, info, infotwo, procent, date ,checked: initialChecked = false }:Props) => {

    const [checked , setChecked] = useState<boolean>(initialChecked)

    const toggleChecked = () => setChecked(prevState => !prevState)

    return (
        <div className={styles.admin_Input_Tab}>
            <div className={styles.admin_input_tab_checked}>
                <input type="checkbox" onClick={toggleChecked} checked={checked} />
            </div>
            <div>{name}</div>
            <div>{email}</div>
            <div>{info}</div>
            <div>{infotwo}</div>
            <div>{procent}</div>
            <div>{date}</div>
        </div>
    );
};