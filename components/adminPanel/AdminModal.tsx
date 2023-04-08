import React, { useCallback, useState } from 'react';
import styles from '../../styles/adminStyles/AdminModal.module.css';
import { Titles } from './types';
import { AdminCheckbox } from './AdminCheckbox';
import { InputArea } from './InputArea';
import {IDObject, WithoutID} from '../../api/types';
import { AdminButton } from './AdminButton';
import Image from "next/image";
import close from "../../public/adminImg/other/close.svg";

type Item<T extends IDObject> = T | WithoutID<T>;

interface Props<T extends IDObject> {
  text?: string;

  onClick?(): void;

  type?: 'primary' | 'secondary' | 'other';
  active: any;

  closeModal(): void;

  item: Item<T>;
  titles: Titles<T>;
  loading?: boolean

  onSubmit?(data?: Item<T>): void;
}

export const AdminModal = <T extends IDObject>({ active, closeModal, item, titles, onSubmit, loading }: Props<T>) => {
  const onClick = useCallback((e: any) => e.stopPropagation, []);

  const [itemState, setItemState] = useState(item);

  const changeValue = useCallback((key: keyof T) => (value: any) => {
    setItemState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }, []);


  return (
    <>
      <div className={active ? styles.modal_container : styles.modal_none}>
        <div className={active ? styles.modal : styles.modal_none} onClick={closeModal}/>
        <div onClick={onClick} className={styles.modal_main}>
          <div style={{ display: 'flex', justifyContent:"end"}}>
            <button className={styles.modal_main_ButtonCancel} onClick={closeModal}>
              <Image
                className={styles.modal_main_img}
                objectFit={'cover'}
                src={close}
              />
            </button>
          </div>
          {Object.entries(titles)
            .map(([key, value]) => {
              if (typeof item[key as keyof Item<T>] === 'string') {
                return (
                  <div key={key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                  }}>
                    <div key={value}>
                      <InputArea placeholder={value} onChange={changeValue(key as keyof Item<T>)}
                                 text={itemState[key as keyof Item<T>] as any}/>
                    </div>
                  </div>
                );
              }
              if (typeof item[key as keyof Item<T>] === 'boolean') {
                return (
                  <div key={key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    padding: '8px 0',
                  }}>
                    <div key={value} className={styles.admin_input_tab_checked_boolean}>
                      <div>{value}</div>
                      <div style={{ width: '10px' }}/>
                      <AdminCheckbox type={item[key as keyof Item<T>] as any ? 'checked' : 'unchecked'}/>
                    </div>
                  </div>
                );
              }
              return <div key={key}/>;
            })}
          <div style={{ display: 'flex', justifyContent:'flex-end' }}>
            <AdminButton text={"Отмена"} type={"secondary"} onClick={()=>console.log("value",item)}/>
            <div style={{width:"20px"}}/>
            <AdminButton text={"Отправить"}  isLoading={loading} onClick={() => onSubmit?.(itemState)}/>
          </div>
        </div>
      </div>
    </>
  );
};

