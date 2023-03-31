import React, {Fragment, useCallback, useState} from 'react';
import styles from '../../styles/adminStyles/AdminModal.module.css';
import { Titles } from './types';
import { AdminCheckbox } from './AdminCheckbox';
import { InputArea } from './InputaArea';
import { IDObject } from '../../api/types';
import {AdminButton} from "./AdminButton";
import {loadGetInitialProps} from "next/dist/shared/lib/utils";
import {DeleteWarningModal} from "./DeleteWarningModal";
import {object} from "prop-types";

interface Props<T> {
  text?: string;
  onClick?(): void;
  type?: 'primary' | 'secondary' | 'other';
  active: any;
  closeModal(): void;
  item: T;
  titles: Titles<T>;
}

export const AdminModal = <T extends IDObject>({ active, closeModal, item, titles }: Props<T>) => {
  const onClick = useCallback((e: any) => e.stopPropagation, []);

  const [itemState, setItemState] = useState(item)
  console.log("state",itemState)

  const changeValue = useCallback((key: keyof typeof item) => (value: any) => {
    setItemState(prevState => ({
      ...prevState,
      [key]: value
    }))
  },[]);

  return (
    <>
      <div className={active ? styles.modal_container : styles.modal_none}>
        <div className={active ? styles.modal : styles.modal_none} onClick={closeModal}/>
        <div onClick={onClick} className={styles.modal_main}>
          <div style={{position:"relative"}}>
            <button className={styles.modal_main_ButtonCancel}>Крестик</button>
          </div>
          {Object.entries(titles)
            .map(([key, value]) => {
              if (typeof item[key as keyof T] === 'string') {
                return (
                  <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"10px"}}>
                    <div key={value}>
                      <InputArea placeholder={value} onChange={changeValue(key as keyof T)} text={itemState[key as keyof T] as any}/>
                    </div>
                      <div style={{width:"50px"}}/>
                    <AdminButton text={"Отправить"}  onClick={()=>console.log("value",itemState[key as keyof T] as any)}/>
                    <div style={{width:"20px"}}/>
                    <AdminButton text={"Вернуть"} type={"secondary"} onClick={()=>console.log("value",item[key as keyof T] as any)}/>
                  </div>
                );
              }
              if (typeof item[key as keyof T] === 'boolean') {
                return (
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px",padding:"8px 0"}}>
                    <div key={value} className={styles.admin_input_tab_checked_boolean}>
                      <div>{value}</div>
                      <div style={{width:"10px"}}/>
                      <AdminCheckbox type={item[key as keyof T] as any ? 'checked' : 'unchecked'}/>
                    </div>
                    <div style={{width:"50px"}}/>
                    <div style={{display:"flex"}}>
                      <AdminButton text={"Отправить"}  onClick={()=>console.log("value",item[key as keyof T] as any)}/>
                      <div style={{width:"20px"}}/>
                      <AdminButton text={"Вернуть"} type={"secondary"} onClick={()=>console.log("value",item[key as keyof T] as any)}/>
                    </div>
                  </div>
                );
              }
              return <div key={value} />;
            })}
        </div>
      </div>
    </>
  );
};

