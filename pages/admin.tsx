import type { NextPage } from 'next'
import styles from '../styles/Admin.module.css'
import React, { useEffect, useState } from 'react';
import { Page } from '../components/Page';
import { AdminPanel } from '../components/AdminPanel';

const Admin: NextPage = () => {

  return (
      <Page title="Cats" meta="bla bla" styles={styles.container} >
          <div className={styles.adminCards}>
              <div className={styles.adminCardsLeft}>
                <AdminPanel text={"Главная"}/>
                <AdminPanel text={"Кошки"}/>
                <AdminPanel text={"Документы"}/>
                <AdminPanel text={"Выставки"}/>
                <AdminPanel text={"Питомники"}/>
                <AdminPanel text={"Контакты"}/>
              </div>
              <div className={styles.adminCardsRight}>2</div>
          </div>
      </Page>
  )
}

export default Admin
