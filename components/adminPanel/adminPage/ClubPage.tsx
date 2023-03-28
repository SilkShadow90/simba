import React, { useCallback } from 'react';
import styles from '../../../styles/adminStyles/AdminClubPage.module.css';
import { AdminButton } from '../AdminButton';
import { useFetchService } from '../../../utils/useFetchService';
import Loader from '../../Loader';
import { AdminInputList } from '../AdminInputList';
import { Titles } from '../types';
import { Nurser } from '../../../api/types';
import NurserMethods from '../../../api/NurserMethods';
import { devLog } from '../../../utils';

const nurserTitles: Titles<Nurser> = {
  name: 'Специализация',
  worked: 'Питомник',
  nameWork: 'Порода',
  suite: 'сайт',
  phone: 'Телефон',
  email: 'email',
};

export const ClubPage = () => {
  const { data: nurseriesData, loading } = useFetchService<Nurser[]>(NurserMethods.getAll);
  const onSubmit = useCallback(() => {
    devLog(nurseriesData);
  }, [nurseriesData]);

  if (loading) {
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
      {!!nurseriesData && (
        <AdminInputList
          items={nurseriesData}
          titles={nurserTitles}
        />
      )}
    </>
  );
};
