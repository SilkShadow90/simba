import React, { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Dropdown from 'react-dropdown';
import Select from 'react-select';
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

import 'react-dropdown/style.css';
import { Flex } from '../../UIKit/Flex';

const crudToMethods: Record<string, ApiMethods<any>> = {
  cats: CatMethods,
  exhibitions: ExhibitionMethods,
  faqs: FaqMethods,
  nurseries: NurserMethods,
  clubs: ClubMethods,
  users: UserMethods,
};

export const TableCRUD = () => {
  const { dictionaries } = useAppSelector(state => state.dictionariesState);
  const { tables, isLoading: crudLoading } = useAppSelector(state => state.tablesState);

  const { page } = useQuery();

  const tabTitles = useMemo(() => tables?.[page]?.tabTitles || {}, [tables, page]);
  const tabFilters = useMemo(() => tables?.[page]?.filters || {}, [tables, page]);
  const filterKeys = useMemo(() => tables?.[page]?.filterKeys || {}, [tables, page]);

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

  const [tabFiltersState, setTabFiltersState] = useState(Object.fromEntries(Object.entries(tabFilters).map(([key]) => [key, 'all'])));

  useEffect(() => {
    if (page) {
      setTabFiltersState(Object.fromEntries(Object.entries(tabFilters).map(([key]) => [key, 'all'])));
    }
  }, [page, tabFilters]);

  const changeFilter = useCallback((key: string) => (value: string) => {
    setTabFiltersState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const isDictionaryId = (key: string): boolean => key.includes('Id');
  const isBooleanField = (key: string): boolean => key.startsWith('is');
  const getRecordName = (key: string = '') => key.includes('Id') && key.replace(/(\w+)Id/, '$1Dictionary') || '';

  const filteredItems = useMemo(() => {
    return tableData?.filter((tableRow) => {
      return Object.entries(tabFiltersState).every(([key, value]) => {
        if (value === 'all') {
          return true;
        }

        if (isDictionaryId(key)) {
          return tableRow[key] === value;
        }

        if (isBooleanField(key)) {
          return (value === 'Да' && tableRow[key]) || (value === 'Нет' && !tableRow[key]);
        }

        return true;
      });
    }) || [];
  }, [tableData, tabFiltersState]);

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
        <Flex styleProps="overflow-auto align-centered">
          {Object.entries(tabFilters).map(([key, value]) => {
            const dictionary = dictionaries?.[getRecordName(key)] || dictionaries?.[getRecordName(filterKeys[key])];

            if (isDictionaryId(key) && dictionary) {
              const options = [{ label: 'Все', value: 'all' }, ...Object.values<any>(dictionary)
                .filter((dict) => tableData?.map((item) => item[key]).includes(dict.id))
                .map(dict => ({ label: dict.name, value: dict.id })) as any];

              if (options.length <= 2) {
                return null;
              }

              return (
                <Fragment key={key}>
                  <div>{value}: </div>
                  <Dropdown
                    className="dropdown-control"
                    options={[{ label: 'Все', value: 'all' }, ...Object.values<any>(dictionary)
                      .filter((dict) => tableData?.map((item) => item[key]).includes(dict.id))
                      .map(dict => ({ label: dict.name, value: dict.id })) as any]}
                    onChange={(data) => changeFilter(key)(data?.value || 'all')}
                    value={{ label: dictionary?.[tabFiltersState[key]]?.name || 'Все', value: tabFiltersState[key] || 'all' }}
                  />
                  <div style={{ width: '10px' }} />
                </Fragment>
              );
            }

            if (isBooleanField(key)) {
              return (
                <Fragment key={key}>
                  <div>{value}: </div>
                  <Dropdown
                    className="dropdown-control"
                    options={[{ label: 'Все', value: 'all' }, 'Да', 'Нет']}
                    onChange={(data) => changeFilter(key)(data?.value || 'all')}
                    value={tabFiltersState[key] || { label: 'Все', value: 'all' }}
                  />
                  <div style={{ width: '10px' }} />
                </Fragment>
              );
            }

            return null;
          })}
        </Flex>

        <AdminButton type={'primary'} onClick={() => {}} text={`Добавить ${addButtonName}`}/>
      </div>
      <div className={styles.openMainStart}>
        {!!filteredItems && (
          <AdminInputList
            itemCallback={itemCallback}
            titles={tabTitles}
            items={filteredItems}
          />
        )}
      </div>
      <Portal isVisible={createLoading || deleteLoading || multiDeleteLoading || updateLoading}>
        <Loader isVisible />
      </Portal>
    </>
  );
};
