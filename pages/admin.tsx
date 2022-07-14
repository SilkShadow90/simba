import type { NextPage } from 'next'
import styles from '../styles/Admin.module.css'
import React, { useEffect } from 'react';
import { Page } from '../components/Page';

const Admin: NextPage = () => {
  return (
      <Page title="Cats" meta="bla bla" styles={styles.container} >
          <div className={styles.adminCards}>
              <div className={styles.adminCardsLeft}>
                <div className={styles.adminCardsLeftColumn}>Главная</div>
                <div className={styles.adminCardsLeftColumn}>Кошки</div>
                <div className={styles.adminCardsLeftColumn}>Документы</div>
                <div className={styles.adminCardsLeftColumn}>Выставки</div>
                <div className={styles.adminCardsLeftColumn}>Питомники</div>
                <div className={styles.adminCardsLeftColumn}>Контакты</div>
              </div>
              <div className={styles.adminCardsRight}>2</div>
          </div>
      </Page>
  )
}

export default Admin
