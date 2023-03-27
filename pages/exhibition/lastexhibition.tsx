import type { NextPage } from 'next';
import React from 'react';
import styles from '../../styles/Lastexhibition.module.css';
import {Page} from "../../components/Page";
import ExhibitionCard from "../../components/Intro/ExhibitionCard";
import {FirstBack} from "../../components/Back";
import { List } from '../../components/List';
import {useFetchService} from "../../utils/useFetchService";
import { getDateString } from '../../utils';
import { Exhibition } from '../../api/types';
import ExhibitionMethods from '../../api/ExhibitionMethods';

const LastExhibitionPage: NextPage = () => {
  const { data: exhibitionData, loading } = useFetchService<Exhibition[]>(ExhibitionMethods.getLatestExhibitions) || {};

  return (
    <Page title="Прошедшие выставки" meta="bla bla" styles={styles.container} isLoading={loading}>
      <div>
        <div className={styles.lasthibition_header}>
          <FirstBack link={'/exhibition'}/>
          <div className={styles.lasthibition_title}>Прошедшие выставки</div>
        </div>
        <List>
          {!!exhibitionData && exhibitionData.map((exhibition) => (
            <ExhibitionCard
              hoverBlock={true}
              opacityBlock={true}
              key={exhibition.id}
              title={`Выставка кошек ${getDateString(exhibition.dateStart, exhibition.dateEnd)}`}
              text={`${getDateString(exhibition.dateStart, exhibition.dateEnd)}, прошла${exhibition.type ? ` ${exhibition.type}` : ''} выставка кошек${exhibition.club ? ` ${exhibition.club}` : ''}, ${exhibition.location}`}
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
