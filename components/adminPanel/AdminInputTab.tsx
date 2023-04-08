import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/adminStyles/Admin.module.css';
import { AdminCheckbox } from './AdminCheckbox';
import { AdminModal } from './AdminModal';
import edit from '../../public/adminImg/other/edit.svg';
import deleteIcon from '../../public/adminImg/other/delete.svg';
import { Club, IDObject, User } from '../../api/types';
import { Titles } from './types';
import { useFetchService } from '../../utils/useFetchService';
import DictionaryMethods from '../../api/DictionaryMethods';
import ClubMethods from '../../api/ClubMethods';
import Loader from '../Loader';
import {DeleteWarningModal} from "./DeleteWarningModal";
import UserMethods from '../../api/UserMethods';

export type AdminTabProps<T> = {
  titles: Titles<T>
  item: T
  checked?: boolean;
  onClick?(): any;
  deleteHandler?(id: string): void
  updateHandler?(date: T): void
  updateLoader?: boolean
}

export const AdminInputTab = <T extends IDObject>({ item, titles, checked, onClick, deleteHandler, updateHandler, updateLoader }: AdminTabProps<T>) => {
  const { data: breedRecord, loading: breedLoading } = useFetchService(DictionaryMethods.getBreedRecord);
  const { data: typeRecord, loading: typeLoading } = useFetchService(DictionaryMethods.getTypeRecord);
  const { data: statusRecord, loading: statusLoading } = useFetchService(DictionaryMethods.getStatusesRecord);
  const { data: clubRecord, loading: clubLoading } = useFetchService(ClubMethods.getRecord<Club>);
  const { data: userRecord, loading: userLoading } = useFetchService(UserMethods.getRecord<User>);

  const records = useMemo(() => ({
    breedRecord,
    typeRecord,
    statusRecord,
    clubRecord,
    userRecord,
  }), [breedRecord, clubRecord, statusRecord, typeRecord, userRecord]);

  const isLoading = breedLoading || typeLoading || statusLoading || clubLoading || userLoading;

  const [modalActive, setModalActive] = useState(false);

  const [deleteModalActive, setDeleteModalActive] = useState(false);

  const toggleDeleteModal = useCallback(() => {
    setDeleteModalActive((prevState) => !prevState);
  }, []);

  const deleteModalPress = useCallback(() => {
    if (deleteHandler) {
      deleteHandler(item.id);
    }
    toggleDeleteModal();
  },[deleteHandler, item.id, toggleDeleteModal]);

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
          const recordName = key.includes('Id') && key.replace(/(\w+)Id/, '$1Record') || '';

          // @ts-ignore
          if (key.includes('Id') && records?.[recordName]) {
            return (
              // @ts-ignore
              <div key={key}>{value && records[recordName]?.[value]?.name}</div>
            );
          }

          if (isLoading && key.includes('Id')) {
            // eslint-disable-next-line react/jsx-key
            return <Loader isVisible />;
          }

          if (typeof value === 'string') {
            return (
              <div key={key}>{value}</div>
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
      {!!deleteHandler && (
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
