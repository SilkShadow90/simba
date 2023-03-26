import type { NextPage } from 'next';
import React from 'react';
import {useRouter} from "next/router";
import { Page } from '../../../components/Page';
import styles from '../../../styles/come.module.css';
import ExhibitionCard from "../../../components/Intro/ExhibitionCard";
import stars from "../../../public/stars.jpg";
import { useFetchService } from '../../../utils/useFetchService';
import Loader from '../../../components/Loader';
import { Strings } from '../../../resources';
import { Exhibition, User } from '../../../api/types';

const сome: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: usersData } = useFetchService<User[]>('users') || {};
    const { data: lastexhibitionData } = useFetchService<Exhibition[]>('lastexhibition') || {};
    const { data: exhibition } = useFetchService<any>('exhibitions/id',{ id: id as string }) || {};
    if (!lastexhibitionData) {
        return (
            <Loader isVisible={true} />
        );
    }


    if (!usersData) {
        return (
          <Loader isVisible={true} />
        );
    }

    return (
      <Page title="Ближайщие выставки" meta="bla bla" styles={styles.container} >
          <div className={styles.exhibition_Main}>
              <div className={styles.comeinfo}>
                  <div>
                      <div className={styles.comeinfo_text}>
                          {Strings.maket(exhibition)}
                      </div>
                      <div className={styles.comeinfo_text}>Что бы подать заявку на участие , необходимо связаться с руководителем выставки через вкладку контакты,
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
                          text={user.catName}
                          csssrc={styles.come_src_winner_one}
                          image={stars.src}
                          link={`/user/${user.id}`}
                        />
                      ))}
                  </div>
              </div>
          </div>
      </Page>
    );
};

export default сome;
