import React, { useCallback } from 'react';
import styles from '../../../styles/adminStyles/AdminClubPage.module.css';
import { AdminButton } from '../AdminButton';
import { useFetchService } from '../../../utils/useFetchService';
import Loader from '../../Loader';
import { AdminInputList } from '../AdminInputList';
import { Titles } from '../AdminInputTab';
import { Nurser } from '../../../api/types';

const nurserTitles: Titles<Nurser> = {
  name: 'Специализация',
  worked: 'Питомник',
  nameWork: 'Порода',
  suite: 'сайт',
  phone: 'Телефон',
  email: 'email',
};

export const ClubPage = () => {
  const { data: nurseriesData } = useFetchService<Nurser[]>('nurseries') || {};
  const onSubmit = useCallback(() => {
    console.log(nurseriesData);
  }, [nurseriesData]);

  if (!nurseriesData) {
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
      <AdminInputList
        items={nurseriesData}
        titles={nurserTitles}
      />
    </>
  );
};
