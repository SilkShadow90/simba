import React, { useCallback, useState } from 'react';
import Select from 'react-select';
import styles from '../../styles/adminStyles/AdminModal.module.css';
import { AdminCheckbox } from './AdminCheckbox';
import { InputArea } from './InputArea';
import { IDObject, Titles, WithoutID } from '../../api/types';
import { Portal } from '../Portal';
import { useAppSelector } from '../../redux/hooks';

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
  const { dictionaries } = useAppSelector(state => state.dictionariesState);

  const [itemState, setItemState] = useState(item);

  const changeValue = useCallback((key: keyof T) => (value: any) => {
    setItemState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const isDictionaryId = (key: string): boolean => key.includes('Id');
  const getRecordName = (key: string) => key.includes('Id') && key.replace(/(\w+)Id/, '$1Dictionary') || '';

  return (
    <Portal isVisible={active} onClick={closeModal}>
      <div className={styles.modal_main}>
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
            if (Array.isArray(item[key as keyof Item<T>]) && isDictionaryId(key)) {
              const recordName = getRecordName(key);

              return (
                <div key={key} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '10px',
                }}>
                  <div>{value}</div>
                  <div style={{ height: '10px' }}/>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="color"
                    isMulti
                    onChange={(data) => changeValue(key as keyof T)(data?.map(d => d.value))}
                    value={{ label: dictionaries[recordName]?.[itemState[key as keyof Item<T>] as unknown as string]?.name, value: itemState[key as keyof Item<T>] as unknown as string }}
                    options={Object.values<any>(dictionaries[recordName] as any).map(dict => ({ label: dict.name, value: dict.id })) as any}
                  />
                </div>
              );
            }
            if (isDictionaryId(key)) {
              const recordName = getRecordName(key);

              return (
                <div key={key} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '10px',
                }}>
                  <div>{value}</div>
                  <div style={{ height: '10px' }}/>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="color"
                    onChange={(data) => changeValue(key as keyof T)(data?.value)}
                    value={{ label: dictionaries[recordName]?.[itemState[key as keyof Item<T>] as unknown as string]?.name, value: itemState[key as keyof Item<T>] as unknown as string }}
                    options={Object.values<any>(dictionaries[recordName] as any).map(dict => ({ label: dict.name, value: dict.id })) as any}
                  />
                </div>
              );
            }


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
                    <AdminCheckbox key={key} type={itemState[key as keyof T] ? 'checked' : 'unchecked'} onClick={() => changeValue(key as keyof T)(!itemState[key as keyof T] as any)}/>
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
    </Portal>
  );
};

