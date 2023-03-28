import type { NextPage } from 'next';
import React from 'react';
import styles from '../../styles/Lastexhibition.module.css';
import {Page} from "../../components/Page";
import ExhibitionCard from "../../components/Intro/ExhibitionCard";
import {FirstBack} from "../../components/Back";
import { List } from '../../components/List';
import {useFetchService} from "../../utils/useFetchService";
import { getDateString } from '../../utils';
import { Club } from '../../api/types';
import ExhibitionMethods from '../../api/ExhibitionMethods';
import DictionaryMethods from '../../api/DictionaryMethods';
import ClubMethods from '../../api/ClubMethods';

const LastExhibitionPage: NextPage = () => {
  const { data: exhibitions, loading: loadingExhibition } = useFetchService(ExhibitionMethods.getLatestExhibitions);
  const { data: typeRecord, loading: loadingType } = useFetchService(DictionaryMethods.getTypeRecord);
  const { data: clubRecord, loading: loadingClub } = useFetchService(ClubMethods.getRecord<Club>);

  return (
    <Page
      title="Прошедшие выставки"
      meta="bla bla"
      styles={styles.container}
      isLoading={loadingExhibition || loadingType || loadingClub}
    >
      <div>
        <div className={styles.lasthibition_header}>
          <FirstBack link={'/exhibition'}/>
          <div className={styles.lasthibition_title}>Прошедшие выставки</div>
        </div>
        <List>
          {!!exhibitions && exhibitions.map((exhibition) => (
            <ExhibitionCard
              hoverBlock={true}
              opacityBlock={true}
              key={exhibition.id}
              title={`Выставка кошек ${getDateString(exhibition.dateStart, exhibition.dateEnd)}`}
              text={`${getDateString(exhibition.dateStart, exhibition.dateEnd)}, прошла${exhibition.typeId && typeRecord ? ` ${typeRecord[exhibition.typeId].name}` : ''} выставка кошек${exhibition.clubId && clubRecord ? ` ${clubRecord[exhibition.clubId].name}` : ''}, ${exhibition.location}`}
              csssrc={styles.lasthibition_srcone}
              image={exhibition.image}
              link={`/exhibition/lastexhibition/${exhibition.id}`}
            />
          ))}
        </List>
      </div>
    </Page>
  );
};
export default LastExhibitionPage;
