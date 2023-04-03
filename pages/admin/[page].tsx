import type { NextPage } from 'next';
import React, { useMemo } from 'react';
import styles from '../../styles/adminStyles/Admin.module.css';
import { useQuery } from '../../redux/hooks';
import { AdminPage } from '../../components/adminPanel/adminPage/AdminPage';
import { TableCRUD } from '../../components/adminPanel/adminPage/TableCRUD';

const Admin: NextPage = () => {
  const { page } = useQuery();
  const renderSecondElement = useMemo(() => {
    switch (page) {
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
