import type { NextPage } from 'next';
import React from 'react';
import styles from '../../styles/Lastexhibition.module.css';
import { Page } from '../../components/Page';
import ExhibitionCard from '../../components/ExhibitionCard';
import { useFetchService } from '../../utils/useFetchService';
import { getDateString } from '../../utils';
import { Club, Exhibition } from '../../api/types';
import ExhibitionMethods from '../../api/ExhibitionMethods';
import DictionaryMethods from '../../api/DictionaryMethods';
import ClubMethods from '../../api/ClubMethods';
import { Grid } from '../../components/UIKit/Grid';
import { GridItem } from '../../components/UIKit/GridItem';
import { ScreenLayout } from '../../components/UIKit/ScreenLayout';
import { TextBlock } from '../../components/UIKit/TextBlock';

const NearExhibitionPage: NextPage = () => {
  const {
    data: exhibitionData,
    loading,
  } = useFetchService<Exhibition[]>(ExhibitionMethods.getNearestExhibitions) || {};

  const { data: typeRecord, loading: loadingType } = useFetchService(DictionaryMethods.getTypeRecord);
  const { data: clubRecord, loading: loadingClub } = useFetchService(ClubMethods.getRecord<Club>);

  return (
    <Page
      title="Ближайщие выставки"
      meta="bla bla"
      styles={styles.container}
      isLoading={loading || loadingType || loadingClub}
    >
      <ScreenLayout>
        <TextBlock type={'H1'}>
          {'Ближайшие выставки'}
        </TextBlock>
        <Grid>
          {!!exhibitionData && exhibitionData.map((exhibition) => (
            <GridItem key={exhibition.id}>
              <ExhibitionCard
                hoverBlock={true}
                opacityBlock={true}
                title={`Выставка кошек ${getDateString(exhibition.dateStart, exhibition.dateEnd)}`}
                text={`${getDateString(exhibition.dateStart, exhibition.dateEnd)}, будет проходить${exhibition.typeId && typeRecord ? ` ${typeRecord[exhibition.typeId]?.name}` : ''} выставка кошек${exhibition.clubId && clubRecord ? ` ${clubRecord[exhibition.clubId]?.name}` : ''}, ${exhibition.location}`}
                image={exhibition.image}
                link={`/exhibition/nearexhibition/${exhibition.id}`}
              />
            </GridItem>
          ))}
        </Grid>
      </ScreenLayout>
    </Page>
  );
};
export default NearExhibitionPage;
