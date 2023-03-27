import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../../components/Page';
import styles from '../../styles/Partners.module.css';
import { useFetchService } from "../../utils/useFetchService";
import ExhibitionCard from "../../components/Intro/ExhibitionCard";
import { Cat } from '../../api/types';
import { useQuery } from '../../redux/hooks';
import CatMethods from '../../api/CatMethods';

const CatPage: NextPage = () => {
  const { id } = useQuery();

  const { data: catsData, loading } = useFetchService<Cat, string>(CatMethods.getCat, id);

  return (
    <Page title="Профиль кошки" meta="bla bla" styles={styles.container} isLoading={loading}>
      {!!catsData && (
        <div className={styles.partners_Main}>
          <div className={styles.partners_logo}>
            <div className={styles.partners_logos}>
              <ExhibitionCard
                opacityBlock={false}
                key={""}
                title={""}
                text={""}
                csssrc={styles.partners_Main__src}
                image={catsData.image}
                link={"#"}
              />
            </div>
            <div className={styles.partners_info_Main}>
              <h3>{catsData.name}</h3>
              <div className={styles.partners_info}>{catsData.breed}</div>
              <div className={styles.partners_info}>{catsData.club}</div>
              <div className={styles.partners_info}>контакты</div>
              <div className={styles.partners_info}>http://goldenpride.ulsimba.ru/</div>
              <div className={styles.partners_info}>контакты
              </div>
              <div> контакты
              </div>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default CatPage;
