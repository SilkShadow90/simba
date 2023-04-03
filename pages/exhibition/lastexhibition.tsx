import type { NextPage } from 'next';
import React from 'react';
import styles from '../../styles/Lastexhibition.module.css';
import { Page } from '../../components/Page';
import ExhibitionCard from '../../components/ExhibitionCard';
import { FirstBack } from '../../components/Back';
import { useFetchService } from '../../utils/useFetchService';
import { getDateString } from '../../utils';
import { Club } from '../../api/types';
import ExhibitionMethods from '../../api/ExhibitionMethods';
import DictionaryMethods from '../../api/DictionaryMethods';
import ClubMethods from '../../api/ClubMethods';
import { Grid } from '../../components/UIKit/Grid';
import { GridItem } from '../../components/UIKit/GridItem';
import { ScreenLayout } from '../../components/UIKit/ScreenLayout';

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
        <ScreenLayout>
          <Grid>
            {!!exhibitions && exhibitions.map((exhibition) => (
              <GridItem key={exhibition.id}>
                <ExhibitionCard
                  hoverBlock={true}
                  opacityBlock={true}
                  title={`Выставка кошек ${getDateString(exhibition.dateStart, exhibition.dateEnd)}`}
                  text={`${getDateString(exhibition.dateStart, exhibition.dateEnd)}, прошла${exhibition.typeId && typeRecord ? ` ${typeRecord[exhibition.typeId].name}` : ''} выставка кошек${exhibition.clubId && clubRecord ? ` ${clubRecord[exhibition.clubId].name}` : ''}, ${exhibition.location}`}
                  image={exhibition.image}
                  link={`/exhibition/lastexhibition/${exhibition.id}`}
                />
              </GridItem>
            ))}
          </Grid>
        </ScreenLayout>
      </div>
    </Page>
  );
};
export default LastExhibitionPage;
