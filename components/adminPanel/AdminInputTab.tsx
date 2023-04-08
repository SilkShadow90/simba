import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/adminStyles/Admin.module.css';
import { AdminCheckbox } from './AdminCheckbox';
import { AdminModal } from './AdminModal';
import edit from '../../public/adminImg/other/edit.svg';
import deleteIcon from '../../public/adminImg/other/delete.svg';
import { IDObject, Titles } from '../../api/types';
import Loader from '../Loader';
import {DeleteWarningModal} from "./DeleteWarningModal";
import { useAppSelector } from '../../redux/hooks';

export type AdminTabProps<T> = {
  titles: Titles<T>
  item: T
  checked?: boolean;
  onClick?(): any;
  itemCallback?(type: 'create' | 'update' | 'delete' | 'multiDelete', data: any): Promise<void>;
  updateLoader?: boolean;
}

export const AdminInputTab = <T extends IDObject>({ item, titles, checked, onClick, itemCallback }: AdminTabProps<T>) => {
  const { dictionaries, isLoading } = useAppSelector(state => state.dictionariesState);

  const [modalActive, setModalActive] = useState(false);

  const [deleteModalActive, setDeleteModalActive] = useState(false);

  const toggleDeleteModal = useCallback(() => {
    setDeleteModalActive((prevState) => !prevState);
  }, []);

  const deleteModalPress = useCallback(async () => {
    if (itemCallback) {
      await itemCallback('delete', item.id);
    }
    toggleDeleteModal();
  },[itemCallback, item.id, toggleDeleteModal]);

  const toggleModal = useCallback(() => {
    setModalActive((prevState) => !prevState);
  }, []);

  const closeModal = useCallback(() => {
    setModalActive(false);
  }, []);

  const getGridSize = (): string => Object.keys(titles)
    .map((key) => {
      if (typeof item[key as keyof T] === 'string') {
        return '1fr';
      }
      if (typeof item[key as keyof T] === 'boolean') {
        return '100px';
      }
      return '1fr';
    }).join(' ');

  const isDictionaryId = (key: string) => key.includes('Id');
  const getRecordName = (key: string) => key.includes('Id') && key.replace(/(\w+)Id/, '$1Dictionary') || '';

  // @ts-ignore
  return (
    <div className={styles.admin_Input_Tab}
         style={{ display: 'grid', gridTemplateColumns: `100px ${getGridSize()} 60px 60px` }}>
      <div className={styles.admin_input_tab_checked}>
        <AdminCheckbox type={checked ? 'checked' : 'unchecked'} onClick={onClick}/>
      </div>
      {Object.keys(titles)
        .map((key) => {
          const value = item[key as keyof T] as any;
          const recordName = getRecordName(key);

          // @ts-ignore
          if (isDictionaryId(key) && dictionaries?.[recordName]) {
            return (
              // @ts-ignore
              <div key={key + value}>{value && dictionaries[recordName]?.[value]?.name}</div>
            );
          }

          if (isLoading && isDictionaryId(key)) {
            return <Loader isVisible key={key + value} />;
          }

          if (typeof value === 'string') {
            return (
              <div key={key + value}>{value}</div>
            );
          }
          if (typeof value === 'boolean') {
            return (
              <div key={key} className={styles.admin_input_tab_checked_boolean}>
                <AdminCheckbox type={value ? 'checked' : 'unchecked'}/>
              </div>
            );
          }
          return <div key={key} />;
        })}
      <AdminModal item={item} titles={titles} active={modalActive} closeModal={closeModal} onSubmit={updateHandler} loading={updateLoader}/>
      <button className={styles.adminTab_edit} onClick={toggleModal}>
        <Image className={styles.adminCardsLeft_input_position_img} objectFit={'cover'} src={edit}/>
      </button>
      {!!itemCallback && (
        <>
          <DeleteWarningModal isVisible={deleteModalActive} onClose={toggleDeleteModal} onDelete={deleteModalPress}/>
          <button className={styles.adminTab_edit} onClick={toggleDeleteModal}>
            <Image className={styles.adminCardsLeft_input_position_img} objectFit={'cover'} src={deleteIcon}/>
          </button>
        </>
      )}
    </div>
  );
};
