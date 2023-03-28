import type { NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/adminStyles/Admin.module.css';
import { Page } from '../components/Page';
import { MainPage } from '../components/adminPanel/adminPage/MainPage';
import { CatsPage } from '../components/adminPanel/adminPage/CatsPage';
import { ExhibitionPage } from '../components/adminPanel/adminPage/ExhibitionPage';
import { ClubPage } from '../components/adminPanel/adminPage/ClubPage';
import { AdminList } from '../components/adminPanel/AdminList';
import { AuthModal } from '../components/AuthModal';

const Admin: NextPage = () => {
  const adminState = useSelector((state: any) => state.adminState);

  const renderSecondElement = () => {

    switch (Object.entries(adminState).find(([_, value]) => value)?.[0]) {
      case 'openedMain':
        return (
          <MainPage/>
        );
      case 'openedCats':
        return (
          <CatsPage/>
        );
      case 'openedDocs':
        return (
          <div className={styles.openMain}>

          </div>
        );
      case 'openedShows':
        return (
          <ExhibitionPage/>
        );
      case 'openedClubs':
        return (
          <ClubPage/>
        );
      case 'openedContacts':
        return (
          <div className={styles.openMain}>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Page title="Панель Администратора" meta="bla bla" styles={styles.container} withoutHeaderAndFooter>
      <div className={styles.adminCards}>
        <AdminList/>
        <div className={styles.adminCardsRightt}>
          {renderSecondElement()}
        </div>
      </div>
      <AuthModal />
    </Page>
  );
};

export default Admin;
