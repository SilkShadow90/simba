import React, { Fragment, useCallback } from 'react';
import styles from '../../styles/adminStyles/AdminModal.module.css';
import { Titles } from './types';
import { AdminCheckbox } from './AdminCheckbox';
import { InputArea } from './InputaArea';
import { IDObject } from '../../api/types';

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

  return (
    <>
      <div className={active ? styles.modal_container : styles.modal_none}>
        <div className={active ? styles.modal : styles.modal_none} onClick={closeModal}/>
        <div onClick={onClick} className={styles.modal_main}>
          {Object.entries(titles)
            .map(([key, value]) => {
              if (typeof item[key as keyof T] === 'string') {
                return (
                  <Fragment key={value}>
                    <InputArea placeholder={value} text={item[key as keyof T] as any}/>
                  </Fragment>
                );
              }
              if (typeof item[key as keyof T] === 'boolean') {
                return (
                  <div key={value} className={styles.admin_input_tab_checked_boolean}>
                    <div>{value}</div>
                    <AdminCheckbox type={item[key as keyof T] as any ? 'checked' : 'unchecked'}/>
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

