import React, { useCallback, useMemo } from 'react';
import styles from '../../../styles/adminStyles/AdminCatsPage.module.css';
import { AdminButton } from '../AdminButton';
import { useFetchService } from '../../../utils/useFetchService';
import Loader from '../../Loader';
import { AdminInputList } from '../AdminInputList';
import CatMethods from '../../../api/CatMethods';
import { useAppSelector, useQuery } from '../../../redux/hooks';
import ExhibitionMethods from '../../../api/ExhibitionMethods';
import FaqMethods from '../../../api/FaqMethods';
import NurserMethods from '../../../api/NurserMethods';
import ClubMethods from '../../../api/ClubMethods';
import UserMethods from '../../../api/UserMethods';
import { ApiMethods } from '../../../api/ApiMethods';
import { Portal } from '../../Portal';

const crudToMethods: Record<string, ApiMethods<any>> = {
  cats: CatMethods,
  exhibitions: ExhibitionMethods,
  faqs: FaqMethods,
  nurseries: NurserMethods,
  clubs: ClubMethods,
  users: UserMethods,
};

export const TableCRUD = () => {
  const { tables, isLoading: crudLoading } = useAppSelector(state => state.tablesState);

  const { page } = useQuery();

  const tabTitles = useMemo(() => tables?.[page]?.tabTitles, [tables, page]);

  const methods = useMemo(() => crudToMethods?.[page] || {
    getAll: () => {}
  }, [page]);

  const addButtonName = useMemo(() => tables?.[page]?.createName || '', [page, tables]);

  const { data: tableData, loading, fetchData } = useFetchService(methods?.getAll);

  const { loading: createLoading, fetchData: fetchCreate } = useFetchService({
    methodFunc: methods.create,
    pending: true,
    successCallback: fetchData
  });

  const { loading: updateLoading, fetchData: fetchUpdate } = useFetchService({
    methodFunc: methods.update,
    pending: true,
    successCallback: fetchData
  });

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

  const itemCallback = useCallback(async (type: 'create' | 'update' | 'delete' | 'multiDelete', data: any) => {
    try {
      switch (type) {
        case 'create':
          await fetchCreate(data);
          break;
        case 'update':
          await fetchUpdate(data);
          break;
        case 'delete':
          await fetchDelete(data);
          break;
        case 'multiDelete':
          await fetchMultiDelete(data);
          break;
        default: {
          await fetchData();
        }
      }
    } catch (e) {
      console.error();
    }
  }, [fetchCreate, fetchData, fetchDelete, fetchMultiDelete, fetchUpdate]);

  if (loading || crudLoading) {
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
        <div className="flex" />
        <AdminButton type={'primary'} onClick={() => {}} text={`Добавить ${addButtonName}`}/>
      </div>
      <div className={styles.openMainStart}>
        {!!tableData && (
          <AdminInputList
            itemCallback={itemCallback}
            titles={tabTitles}
            items={tableData}
          />
        )}
      </div>
      <Portal isVisible={createLoading || deleteLoading || multiDeleteLoading || updateLoading}>
        <Loader isVisible />
      </Portal>
    </>
  );
};
