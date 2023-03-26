import React, { useCallback } from 'react';
import styles from '../../../styles/adminStyles/AdminCatsPage.module.css';
import { AdminButton } from '../AdminButton';
import { Titles } from '../AdminInputTab';
import { useFetchService } from '../../../utils/useFetchService';
import Loader from '../../Loader';
import { AdminInputList } from '../AdminInputList';
import { Cat } from '../../../api/types';

const catTitles: Titles<Cat> = {
  name: 'Имя',
  breed: 'Порода',
  favorite: 'Избранное',
  club: 'Клуб',
};

export const CatsPage = () => {
  const { data: catsData } = useFetchService<Cat[]>('cats') || {};

  const onSubmit = useCallback(() => {
    console.log(catsData);
  }, [catsData]);

  if (!catsData) {
    return (
      <Loader isVisible={true}/>
    );
  }

  return (
    <>
      <div className={styles.openCatsFiltered}>
        <div className={styles.openCatsFiltered_left}>
          <div>Filter</div>
          <select className={styles.openCatsFiltered_left_select} name="all" id="1">
            <option value="1">all</option>
          </select>
        </div>
        <AdminButton type={'primary'} onClick={onSubmit} text={'Add Contact'}/>
      </div>
      <div className={styles.openMainStart}>
        <AdminInputList
          titles={catTitles}
          items={catsData}
        />
      </div>
    </>
  );
};
