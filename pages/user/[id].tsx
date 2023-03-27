import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../../components/Page';
import styles from '../../styles/user.module.css';
import ExhibitionCard from '../../components/Intro/ExhibitionCard';
import { useFetchService } from '../../utils/useFetchService';
import { User } from '../../api/types';
import { useQuery } from '../../redux/hooks';
import UserMethods from '../../api/UserMethods';

const Id: NextPage = () => {
  const { id } = useQuery();

  const { data: userData, loading } = useFetchService<User, string>(UserMethods.getUser, id) || {};

  return (
    <Page title="Информация пользователя" meta="bla bla" styles={styles.container} isLoading={loading}>
      {!!userData && (
        <div className={styles.usermain}>
          <div className={styles.usercard}>
            <ExhibitionCard
              hoverBlock={false}
              opacityBlock={false}
              title={userData.name}
              text={userData.catName}
              csssrc={styles.user_src}
              link={'#'}
              image={userData.image}
            />
            <div className={styles.usermain_block}>
              <div className={styles.usermain_block_header}>
                Информация пользователя
              </div>
              <div className={styles.usermain_block_title}>
                <div>
                  ФИО:
                </div>
                <div className={styles.usermain_block_title_info}>
                  {userData.name}
                </div>
              </div>
              <div className={styles.usermain_block_title}>
                <div>
                  Порода кота
                </div>
                <div className={styles.usermain_block_title_info}>
                  {userData.breed}
                </div>
              </div>
              <div className={styles.usermain_block_title}>
                <div>
                  Телефон
                </div>
                <div className={styles.usermain_block_title_info}>
                  {userData.phone}
                </div>
              </div>
              <div className={styles.usermain_block_title}>
                <div>
                  Email:
                </div>
                <div className={styles.usermain_block_title_info}>
                  {userData.email}
                </div>
              </div>
              <div className={styles.usermain_block_header}>
                Награды
              </div>
              {
                userData.prizes?.length
                  ? userData.prizes.map((value) => (
                    <div key={value} className={styles.usermain_block_title}>
                      {value}
                    </div>
                  ))
                  : (
                    <div className={styles.usermain_block_title}>
                      Нет наград
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default Id;
