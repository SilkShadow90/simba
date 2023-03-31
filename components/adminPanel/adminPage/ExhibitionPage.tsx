import React, { useCallback } from 'react';
import styles from '../../../styles/adminStyles/AdminExhibitionPage.module.css';
import { AdminButton } from '../AdminButton';
import { Titles } from '../types';
import { useFetchService } from '../../../utils/useFetchService';
import Loader from '../../Loader';
import { AdminInputList } from '../AdminInputList';
import { Exhibition } from '../../../api/types';
import ExhibitionMethods from '../../../api/ExhibitionMethods';
import { devLog } from '../../../utils';
import NurserMethods from "../../../api/NurserMethods";


const exhibitionTitles: Titles<Exhibition> = {
  location: 'Местоположение',
  typeId: 'Тип',
  clubId: 'Клуб',
  dateStart: 'Дата начала',
  dateEnd: 'Дата конца',
};

export const ExhibitionPage = () => {
  const { data: exhibitionData, loading, fetchData: fetchExhibitions } = useFetchService<Exhibition[]>(ExhibitionMethods.getAll);


  const { loading: deleteExhibitionLoading, fetchData: fetchDeleteExhibition } = useFetchService({
    methodFunc: ExhibitionMethods.delete,
    pending: true,
    successCallback: fetchExhibitions
  });
  const { loading: multiDeleteExhibitionLoading, fetchData: fetchMultiDeleteExhibition } = useFetchService({
    methodFunc: ExhibitionMethods.multiDelete,
    pending: true,
    successCallback: fetchExhibitions
  });


  const onSubmit = useCallback(() => {
    devLog(exhibitionData);
  }, [exhibitionData]);

  const onDelete = useCallback((id:string) => {
    fetchDeleteExhibition(id);
  }, [fetchDeleteExhibition]);

  const onMultiDelete = useCallback((ids:string[]) => {
    fetchMultiDeleteExhibition(ids);
  }, [fetchMultiDeleteExhibition]);

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
      <div className={styles.openMainStart}>
        {!!exhibitionData && (
          <AdminInputList
            titles={exhibitionTitles}
            items={exhibitionData}
            multiDeleteHandler={onMultiDelete}
            deleteHandler={onDelete}
          />
        )}
      </div>
    </>
  );
};
