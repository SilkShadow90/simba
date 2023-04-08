import React, { useCallback, useState } from 'react';
import Select from 'react-select';
import styles from '../../styles/adminStyles/AdminModal.module.css';
import { Titles } from './types';
import { AdminCheckbox } from './AdminCheckbox';
import { InputArea } from './InputArea';
import { IDObject } from '../../api/types';
import { Portal } from '../Portal';
import { useAppSelector } from '../../redux/hooks';

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
  const { dictionaries } = useAppSelector(state => state.dictionariesState);

  const [itemState, setItemState] = useState(item);

  const changeValue = useCallback((key: keyof typeof item) => (value: any) => {
    console.warn(value);
    setItemState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const isDictionaryId = (key: string) => key.includes('Id');
  const getRecordName = (key: string) => key.includes('Id') && key.replace(/(\w+)Id/, '$1Dictionary') || '';


  return (
    <Portal isVisible={active} onClick={closeModal}>
      <div className={styles.modal_main}>
        <div style={{ position: 'relative' }}>
          <button className={styles.modal_main_ButtonCancel}>Крестик</button>
        </div>
        {Object.entries(titles)
          .map(([key, value]) => {
            if (Array.isArray(item[key as keyof T]) && isDictionaryId(key)) {
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
                    value={{ label: dictionaries[recordName]?.[itemState[key as keyof T] as unknown as string]?.name, value: itemState[key as keyof T] as unknown as string }}
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
                    value={{ label: dictionaries[recordName]?.[itemState[key as keyof T] as unknown as string]?.name, value: itemState[key as keyof T] as unknown as string }}
                    options={Object.values<any>(dictionaries[recordName] as any).map(dict => ({ label: dict.name, value: dict.id })) as any}
                  />
                </div>
              );
            }


            if (typeof item[key as keyof T] === 'string') {
              return (
                <div key={key} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}>
                  <div key={value}>
                    <InputArea placeholder={value} onChange={changeValue(key as keyof T)}
                               text={itemState[key as keyof T] as any}/>
                  </div>
                </div>
              );
            }
            if (typeof item[key as keyof T] === 'boolean') {
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
      </div>
    </Portal>
  );
};

