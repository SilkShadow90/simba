import type { NextPage } from 'next';
import React, {useEffect, useMemo, useState} from 'react';
import { MainPage } from '../components/adminPanel/adminPage/MainPage';
import { AdminPage } from '../components/adminPanel/adminPage/AdminPage';
import { useAppDispatch, useQuery } from '../redux/hooks';
import styles from '../styles/adminStyles/Admin.module.css';
import { TableCRUD } from '../components/adminPanel/adminPage/TableCRUD';
import { fetchDictionaries, fetchTables } from '../redux/actionCreators';
import {AdminSearch} from "../components/adminPanel/AdminSearch";
import {onChangeInput} from "../utils";

const Admin: NextPage = () => {
  const dispatch = useAppDispatch();

  const [valueSearch, setValueSearch] = useState<string>('');
  console.log(valueSearch)
  useEffect(() => {
    dispatch(fetchDictionaries());
    dispatch(fetchTables());
  }, [dispatch]);

  const { page } = useQuery();
  const renderSecondElement = useMemo(() => {
    switch (page) {
      case 'main':
        return (
          <>
            <MainPage/>
          </>
        );
      case 'docs':
        return (
          <div className={styles.openMain}>

          </div>
        );
      case 'contacts':
        return (
          <div className={styles.openMain}>
          </div>
        );
      default:
        return (
          <>
            <AdminSearch value={valueSearch} onChange={onChangeInput(setValueSearch)}/>
            <TableCRUD valueSearch={valueSearch}/>
          </>
        );
    }
  }, [page,valueSearch]);

  return (
    <AdminPage>
      {renderSecondElement}
    </AdminPage>
  );
};

export default Admin;
