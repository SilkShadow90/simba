import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../../components/Page';
import styles from '../../styles/user.module.css';
import ExhibitionCard from '../../components/Intro/ExhibitionCard';
import { useFetchService } from '../../utils/useFetchService';
import { useQuery } from '../../redux/hooks';
import UserMethods from '../../api/UserMethods';
import DictionaryMethods from '../../api/DictionaryMethods';
import CatMethods from '../../api/CatMethods';

const Id: NextPage = () => {
  const { id } = useQuery();

  const { data: user, loading } = useFetchService(UserMethods.getById, id);
  const { data: breedRecord, loading: breedLoading } = useFetchService(DictionaryMethods.getBreedRecord);
  const { data: cats, loading: catsLoading } = useFetchService(CatMethods.getByIds, user?.catsIds);

  return (
    <Page
      title="Информация пользователя"
      meta="bla bla"
      styles={styles.container}
      isLoading={loading || breedLoading || catsLoading}
    >
      {!!user && breedRecord && (
        <div className={styles.usermain}>
          <div className={styles.usercard}>
            <ExhibitionCard
              hoverBlock={false}
              opacityBlock={false}
              title={user.name}
              text={user.email}
              csssrc={styles.user_src}
              link={'#'}
              image={user.image}
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
                  {user.name}
                </div>
              </div>
              <div className={styles.usermain_block_title}>
                <div>
                  Телефон
                </div>
                <div className={styles.usermain_block_title_info}>
                  {user.phone}
                </div>
              </div>
              <div className={styles.usermain_block_title}>
                <div>
                  Email:
                </div>
                <div className={styles.usermain_block_title_info}>
                  {user.email}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.usercard}>
            {!!cats && cats.map(cat => (
              <ExhibitionCard
                key={cat.id}
                hoverBlock={true}
                opacityBlock={true}
                title={cat.name}
                text={breedRecord[cat.breedId].name}
                csssrc={styles.user_src}
                image={cat.image}
                link={`/cats/${cat.id}`}
              />
            ))}
          </div>
        </div>
      )}
    </Page>
  );
};

export default Id;
