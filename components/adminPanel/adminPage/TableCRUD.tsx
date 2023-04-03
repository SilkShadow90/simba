import React, { useCallback, useMemo } from 'react';
import styles from '../../../styles/adminStyles/AdminCatsPage.module.css';
import { AdminButton } from '../AdminButton';
import { useFetchService } from '../../../utils/useFetchService';
import Loader from '../../Loader';
import { AdminInputList } from '../AdminInputList';
import { Cat } from '../../../api/types';
import CatMethods from '../../../api/CatMethods';
import FieldsMethods from '../../../api/FieldsMethods';
import { useQuery } from '../../../redux/hooks';
import ExhibitionMethods from '../../../api/ExhibitionMethods';
import FaqMethods from '../../../api/FaqMethods';
import NurserMethods from '../../../api/NurserMethods';
import ClubMethods from '../../../api/ClubMethods';
import UserMethods from '../../../api/UserMethods';
import { ApiMethods } from '../../../api/ApiMethods';

const crudToMethods: Record<string, ApiMethods<any>> = {
  cats: CatMethods,
  exhibitions: ExhibitionMethods,
  faqs: FaqMethods,
  nurseries: NurserMethods,
  clubs: ClubMethods,
  users: UserMethods,
};

const crudToName: Record<string, string> = {
  cats: 'животное',
  exhibitions: 'выставку',
  faqs: 'вопрос',
  nurseries: 'питомник',
  clubs: 'клуб',
  users: 'пользователя',
};

export const TableCRUD = () => {
  const { data: crud, loading: crudLoader } = useFetchService(FieldsMethods.getData);
  const { page } = useQuery();

  const tabTitles = useMemo(() => crud?.[page]?.tabTitles, [crud, page]);

  const methods = useMemo(() => crudToMethods?.[page] || {
    getAll: () => {}
  }, [page]);
  const addButtonName = useMemo(() => crudToName?.[page] || '', [page]);

  const { data, loading, fetchData } = useFetchService(methods?.getAll);

  const { loading: createLoading, fetchData: fetchCreate } = useFetchService<void, Cat>({
    methodFunc: methods.create,
    pending: true,
    successCallback: fetchData
  });

  const onCreate = useCallback(() => {
    // todo add create
  }, []);

  const { loading: deleteLoading, fetchData: fetchDelete } = useFetchService({
    methodFunc: methods.delete,
    pending: true,
    successCallback: fetchData
  });
  const { loading: multiDeleteLoading, fetchData: fetchMultiDelete } = useFetchService({
    methodFunc: methods.multiDelete,
    pending: true,
    successCallback: fetchData
  });

  const onDelete = useCallback(async (id:string) => {
    await fetchDelete(id);
  }, [fetchDelete]);

  const onMultiDelete = useCallback(async (ids:string[]) => {
    await fetchMultiDelete(ids);
  }, [fetchMultiDelete]);

  if (loading || createLoading || crudLoader || deleteLoading || multiDeleteLoading) {
    return (
      <Loader isVisible={true}/>
    );
  }

  if (!tabTitles) {
    return null;
  }

  return (
    <>
      <div className={styles.openCatsFiltered}>
        <div className={styles.openCatsFiltered_left}>

        </div>
        <AdminButton type={'primary'} onClick={onCreate} text={`Добавить ${addButtonName}`}/>
      </div>
      <div className={styles.openMainStart}>
        {!!data && (
          <AdminInputList
            multiDeleteHandler={onMultiDelete}
            deleteHandler={onDelete}
            titles={tabTitles}
            items={data}
          />
        )}
      </div>
    </>
  );
};
