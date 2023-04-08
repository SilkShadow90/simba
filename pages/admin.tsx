import type { NextPage } from 'next';
import React, { useMemo } from 'react';
import { MainPage } from '../components/adminPanel/adminPage/MainPage';
import { AdminPage } from '../components/adminPanel/adminPage/AdminPage';
import { useQuery } from '../redux/hooks';
import styles from '../styles/adminStyles/Admin.module.css';
import { TableCRUD } from '../components/adminPanel/adminPage/TableCRUD';
import {CatsPage} from "../components/adminPanel/adminPage/CatsPage";

const Admin: NextPage = () => {
  const { page } = useQuery();
  const renderSecondElement = useMemo(() => {
    switch (page) {
      case 'main':
        return (
          <MainPage/>
        );
      case 'cats':
        return (
          <CatsPage/>
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
        return <TableCRUD />;
    }
  }, [page]);

  return (
    <AdminPage>
      {renderSecondElement}
    </AdminPage>
  );
};

export default Admin;
