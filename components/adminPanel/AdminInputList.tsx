import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { AdminInputTab } from './AdminInputTab';
import styles from '../../styles/adminStyles/Admin.module.css';
import deleteSrc from '../../public/adminImg/menu/delete.svg';
import { AdminCheckbox } from './AdminCheckbox';
import { Text } from './Text';
import { ID, IDObject, Titles } from '../../api/types';
import {DeleteWarningModal} from "./DeleteWarningModal";
import { getPluralForm } from '../../utils';

export type AdminListProps<T> = {
  titles: Titles<T>
  items: T[]
  itemCallback?(type: 'create' | 'update' | 'delete' | 'multiDelete', data: any): Promise<void>
  updateLoader?: boolean
}

export const AdminInputList = <T extends IDObject>({ titles, items, itemCallback, updateLoader }: AdminListProps<T>) => {
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [checkedList, setCheckedList] = useState<ID[]>([]);

  const toggleDeleteModal = useCallback(() => {
    setDeleteModalActive((prevState) => !prevState);
  }, []);

  const deleteModalPress = useCallback(async () => {
    if (itemCallback) {
      await itemCallback('multiDelete', checkedList);
    }
    toggleDeleteModal();
  },[itemCallback, checkedList, toggleDeleteModal]);

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

  if (!items.length) {
    return (
      <div className={styles.admin_Input_Tab}
           style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
        <div>Нет данных</div>
      </div>
    );
  }

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
                  <Text size={'small'} color={'black'} text={getPluralForm(checkedList.length, 'выбран', 'выбрано', 'выбрано')}/>
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
          item={item}
          checked={checkedList.includes(item.id)}
          onClick={toggle(item.id)}
          titles={titles}
          itemCallback={itemCallback}
        />
      ))}
    </div>
  );
};
