import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { AdminInputTab } from './AdminInputTab';
import { Titles } from './types';
import styles from '../../styles/adminStyles/Admin.module.css';
import deleteSrc from '../../public/adminImg/menu/delete.svg';
import { AdminCheckbox } from './AdminCheckbox';
import { Text } from './Text';
import { ID, IDObject} from '../../api/types';
import {DeleteWarningModal} from "./DeleteWarningModal";

export type AdminListProps<T> = {
  titles: Titles<T>
  items: T[]
  deleteHandler?(id: string): void
  multiDeleteHandler?(ids: string[]): void
  updateHandler?(data: T): void
  updateLoader?: boolean
}

export const AdminInputList = <T extends IDObject>({ titles, items, deleteHandler, multiDeleteHandler, updateHandler, updateLoader }: AdminListProps<T>) => {
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [checkedList, setCheckedList] = useState<ID[]>([]);

  const toggleDeleteModal = useCallback(() => {
    setDeleteModalActive((prevState) => !prevState);
  }, []);

  const deleteModalPress = useCallback(() => {
    if (multiDeleteHandler) {
      multiDeleteHandler(checkedList);
    }
    toggleDeleteModal();
  },[multiDeleteHandler, checkedList, toggleDeleteModal])

  const toggle = (id: string) => () => setCheckedList((prevState) => {
    if (prevState.includes(id)) {
      return prevState.filter((value) => value !== id);
    }
    return prevState.concat(id);
  });

  const allChecked = checkedList.length === items.length || checkedList.length;

  const toggleAll = useCallback(() => {
    setCheckedList((prevState) => {
      if (prevState.length === items.length) {
        return [];
      }
      return items.map(item => item.id);
    });
  }, [items]);

  const getGridSize = (): string => Object.keys(titles)
    .map((key) => {
      if (typeof items[0][key as keyof T] === 'string') {
        return '1fr';
      }
      if (typeof items[0][key as keyof T] === 'boolean') {
        return '100px';
      }
      return '1fr';
    }).join(' ');


  return (
    <div>
      <DeleteWarningModal isVisible={deleteModalActive} onDelete={deleteModalPress} onClose={toggleDeleteModal}/>
      <div className={styles.admin_Input_Tab}
           style={{ display: 'grid', gridTemplateColumns: allChecked ? '1fr' : `100px ${getGridSize()} 60px 60px` }}>
        {!allChecked ? (
          <>
            <div className={styles.admin_input_tab_checked}>
              <AdminCheckbox type={!allChecked ? 'unchecked' : 'checked'} onClick={toggleAll}/>
              {/* <input type="checkbox" onClick={toggleAll} checked={allChecked} /> */}
            </div>

            {Object.values(titles).map((value) => (
              <div key={value}>{value}</div>
            ))}
          </>
        ) : (
          <>
            <div className={styles.admin_input_tab_checked}>
              <div className={styles.admin_input_tab_checked_box}>
                <AdminCheckbox type={allChecked ? 'checked' : 'unchecked'} onClick={toggleAll}/>
                <div className={styles.admin_input_tab_checked_boxStyle}>
                  {checkedList.length} <Text size={'small'} color={'black'} text={'Selected'}/>
                </div>
                <button onClick={toggleDeleteModal} className={styles.admin_input_tab_checked_boxStyleButton}>
                  <Image className={styles.adminCardsLeft_input_position_img} objectFit={'cover'} src={deleteSrc}/>
                </button>
              </div>
            </div>

          </>
        )}
      </div>
      {items.map((item) => (
        <AdminInputTab
          key={item.id}
          updateLoader={updateLoader}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          item={item}
          checked={checkedList.includes(item.id)}
          onClick={toggle(item.id)}
          titles={titles}
        />
      ))}
    </div>
  );
};
