import type { NextPage } from 'next';
import React from 'react';
import {useRouter} from "next/router";
import { Page } from '../../../components/Page';
import styles from '../../../styles/come.module.css';
import ExhibitionCard from "../../../components/Intro/ExhibitionCard";
import stars from "../../../public/stars.jpg";
import { useFetchService } from '../../../utils/useFetchService';
import { User } from '../../api/users';
import Loader from '../../../components/Loader';
import {Lastexhibition} from "../../api/lastexhibition";
import {getDateString} from "../../../utils";

const сome: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { id } = router.query;
    console.log('id', id);
    const { data: usersData } = useFetchService<User[]>('users') || {};
    const { data: lastexhibitionData } = useFetchService<Lastexhibition[]>('lastexhibition') || {};
    const { data: exhibition } = useFetchService<any>('exhibition',{ id: id as string }) || {};
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
                      {/*{!!lastexhibitionData && lastexhibitionData.map((lastexhibition) => (*/}
                      {/*  <div>{ lastexhibition.id && getDateString(lastexhibition.dateStart, lastexhibition.dateEnd)}</div>*/}
                      {/*  ))}*/}
                      <div className={styles.comeinfo_text}>{getDateString(exhibition?.dateStart, exhibition?.dateEnd)}
                      будет проводиться {exhibition?.type} выставка кошек, по адресу {exhibition?.streets}
                      </div>
                      <div className={styles.comeinfo_text}>Что бы подать заявку на участие , необходимо связаться с руководителем выставки через вкладку контакты,
                          а так же заполнить предварительно анкету и отправить ее нам
                      </div>
                  </div>
              </div>
              <div className={styles.comeinfo_title}>
                   {/*{`${getDateString(lastexhibition.dateStart, lastexhibition.dateEnd)}, прошла${lastexhibition.type ? ` ${lastexhibition.type}` : ''}*/}
                    {/* выставка кошек${lastexhibition.club ? ` ${lastexhibition.club}` : ''}, ${lastexhibition.location}`}*/}
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
