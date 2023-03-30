import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../../components/Page';
import styles from '../../styles/Partners.module.css';
import { useFetchService } from "../../utils/useFetchService";
import ExhibitionCard from "../../components/ExhibitionCard";
import { Club } from '../../api/types';
import { useQuery } from '../../redux/hooks';
import CatMethods from '../../api/CatMethods';
import DictionaryMethods from '../../api/DictionaryMethods';
import ClubMethods from '../../api/ClubMethods';

const CatPage: NextPage = () => {
  const { id } = useQuery();

  const { data: cats, loading: catLoading } = useFetchService(CatMethods.getById, id);
  const { data: breedRecord, loading: breedLoading } = useFetchService(DictionaryMethods.getBreedRecord);
  const { data: clubRecord, loading: clubLoading } = useFetchService(ClubMethods.getRecord<Club>);

  return (
    <Page
      title="Профиль кошки"
      meta="bla bla"
      styles={styles.container}
      isLoading={catLoading || breedLoading || clubLoading}
    >
      {!!cats && !!breedRecord && !!clubRecord && (
        <div className={styles.partners_Main}>
          <div className={styles.partners_logo}>
            <div className={styles.partners_logos}>
              <ExhibitionCard
                opacityBlock={false}
                key={""}
                title={""}
                text={""}
                image={cats.image}
                link={"#"}
              />
            </div>
            <div className={styles.partners_info_Main}>
              <h3>{cats.name}</h3>
              <div className={styles.partners_info}>{breedRecord[cats.breedId].name}</div>
              <div className={styles.partners_info}>{clubRecord[cats.clubId].id}</div>
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
