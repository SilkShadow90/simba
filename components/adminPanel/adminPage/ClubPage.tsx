import React, { useCallback } from 'react';
import styles from '../../../styles/adminStyles/AdminClubPage.module.css';
import { AdminButton } from '../AdminButton';
import { useFetchService } from '../../../utils/useFetchService';
import Loader from '../../Loader';
import { AdminInputList } from '../AdminInputList';
import { Nurser, Titles } from '../../../api/types';
import NurserMethods from '../../../api/NurserMethods';
import { devLog } from '../../../utils';
import CatMethods from "../../../api/CatMethods";

const nurserTitles: Titles<Nurser> = {
  name: 'Специализация',
  worked: 'Питомник',
  nameWork: 'Порода',
  suite: 'сайт',
  phone: 'Телефон',
  email: 'email',
};

export const ClubPage = () => {
  const { data: nurseriesData, loading, fetchData: fetchNursers } = useFetchService<Nurser[]>(NurserMethods.getAll);


  const { loading: deleteNurserLoading, fetchData: fetchDeleteNurser } = useFetchService({
    methodFunc: NurserMethods.delete,
    pending: true,
    successCallback: fetchNursers
  });
  const { loading: multiDeleteNurserLoading, fetchData: fetchMultiDeleteNurser } = useFetchService({
    methodFunc: NurserMethods.multiDelete,
    pending: true,
    successCallback: fetchNursers
  });
  const onSubmit = useCallback(() => {
    devLog(nurseriesData);
  }, [nurseriesData]);
  const onDelete = useCallback((id:string) => {
    fetchDeleteNurser(id);
  }, [fetchDeleteNurser]);

  const onMultiDelete = useCallback((ids:string[]) => {
    fetchMultiDeleteNurser(ids);
  }, [fetchMultiDeleteNurser]);

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
          // multiDeleteHandler={onMultiDelete}
          // deleteHandler={onDelete}
          items={nurseriesData}
          titles={nurserTitles}
        />
      )}
    </>
  );
};
