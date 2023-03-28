import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../../../components/Page';
import styles from '../../../styles/come.module.css';
import ExhibitionCard from '../../../components/Intro/ExhibitionCard';
import stars from '../../../public/stars.jpg';
import { useFetchService } from '../../../utils/useFetchService';
import { Strings } from '../../../resources';
import { Exhibition, User } from '../../../api/types';
import { useQuery } from '../../../redux/hooks';
import UserMethods from '../../../api/UserMethods';
import ExhibitionMethods from '../../../api/ExhibitionMethods';

const NearestExhibition: NextPage = () => {
  const { id } = useQuery();

  const { data: usersData, loading: usersLoading } = useFetchService<User[]>(UserMethods.getAll);
  const {
    data: exhibition,
    loading: exhibitionLoading,
  } = useFetchService<Exhibition | null, string>(ExhibitionMethods.getById, id);

  return (
    <Page
      title="Ближайщие выставки"
      meta="bla bla"
      styles={styles.container}
      isLoading={usersLoading || exhibitionLoading}
    >
      {!!exhibition && (
        <div className={styles.exhibition_Main}>
          <div className={styles.comeinfo}>
            <div>
              <div className={styles.comeinfo_text}>
                {Strings.maket(exhibition)}
              </div>
              <div className={styles.comeinfo_text}>Что бы подать заявку на участие , необходимо связаться с
                руководителем выставки через вкладку контакты,
                а так же заполнить предварительно анкету и отправить ее нам
              </div>
            </div>
          </div>
          <div className={styles.comeinfo_title}>
          </div>
          <div className={styles.comearbiter}>
            <div className={styles.comeinfo}>Судьи</div>
            <div className={styles.comearbiter_info}>
              {usersData && usersData.map((user) => (
                <ExhibitionCard
                  hoverBlock={true}
                  opacityBlock={true}
                  key={user.id}
                  title={user.name}
                  text={user.email}
                  csssrc={styles.come_src_winner_one}
                  image={stars.src}
                  link={`/user/${user.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default NearestExhibition;
