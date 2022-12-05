import type { NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Admin.module.css';
import { Page } from '../components/Page';
import { AdminPanel } from '../components/AdminPanel';

const Admin: NextPage = () => {
  const adminState = useSelector((state: any) => state.adminState);

  const renderSecondElement = () => {
    switch (Object.entries(adminState).find(([_, value]) => value)?.[0]) {
      case 'openedMain':
        return (
          <div className={styles.openMain}>
              <div>
                <button>Добавить</button>
                <button>Удалить</button>
              </div>
          </div>
        );
      case 'openedCats':
        return (
          <div>openedCats</div>
        );
      case 'openedDocs':
        return (
          <div>openedDocs</div>
        );
      case 'openedShows':
        return (
          <div>openedShows</div>
        );
      case 'openedClubs':
        return (
          <div>openedClubs</div>
        );
      case 'openedContacts':
        return (
          <div>openedContacts</div>
        );
    }

    return null;
  };

  return (
      <Page title="Cats" meta="bla bla" styles={styles.container} withoutHeaderAndFooter>
          <div className={styles.adminCards}>
              <div className={styles.adminCardsLeft}>
                <AdminPanel text={"Главная"} type='openedMain' />
                <AdminPanel text={"Кошки"} type='openedCats' />
                <AdminPanel text={"Документы"} type='openedDocs' />
                <AdminPanel text={"Выставки"} type='openedShows' />
                <AdminPanel text={"Питомники"} type='openedClubs' />
                <AdminPanel text={"Контакты"} type='openedContacts' />
              </div>
              <div className={styles.adminCardsRight}>
                {renderSecondElement()}
              </div>
          </div>
      </Page>
  );
};

export default Admin;
