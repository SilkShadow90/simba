import type { NextPage } from 'next'
import styles from '../styles/Admin.module.css'
import React, { useEffect, useState } from 'react';
import { Page } from '../components/Page';
import { AdminPanel } from '../components/AdminPanel';
import { useSelector } from 'react-redux';

const Admin: NextPage = () => {
  const adminState = useSelector((state: any) => state.adminState)

  const renderSecondElement = () => {
    switch (Object.entries(adminState).find(([_, value]) => value)?.[0]) {
      case 'openedMain':
        return (
          <div>openedMain</div>
        )
      case 'openedCats':
        return (
          <div>openedCats</div>
        )
      case 'openedDocs':
        return (
          <div>openedDocs</div>
        )
      case 'openedShows':
        return (
          <div>openedShows</div>
        )
      case 'openedClubs':
        return (
          <div>openedClubs</div>
        )
      case 'openedContacts':
        return (
          <div>openedContacts</div>
        )
    }

    return null;
  }

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
  )
}

export default Admin
