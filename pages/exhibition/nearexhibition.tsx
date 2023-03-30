import type { NextPage } from 'next';
import React from 'react';
import styles from '../../styles/Lastexhibition.module.css';
import { Page } from '../../components/Page';
import ExhibitionCard from '../../components/ExhibitionCard';
import { FirstBack } from '../../components/Back';
import { List } from '../../components/List';
import { useFetchService } from '../../utils/useFetchService';
import { getDateString } from '../../utils';
import { Club, Exhibition } from '../../api/types';
import ExhibitionMethods from '../../api/ExhibitionMethods';
import DictionaryMethods from '../../api/DictionaryMethods';
import ClubMethods from '../../api/ClubMethods';

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
      <div className={styles.lasthibition_header}>
        <FirstBack link={'/exhibition'}/>
        <div className={styles.lasthibition_title}>Ближайщие выставки</div>
      </div>
      <List>
        {!!exhibitionData && exhibitionData.map((exhibition) => (
          <ExhibitionCard
            hoverBlock={true}
            opacityBlock={true}
            key={exhibition.id}
            title={`Выставка кошек ${getDateString(exhibition.dateStart, exhibition.dateEnd)}`}
            text={`${getDateString(exhibition.dateStart, exhibition.dateEnd)}, будет проходить${exhibition.typeId && typeRecord ? ` ${typeRecord[exhibition.typeId].name}` : ''} выставка кошек${exhibition.clubId && clubRecord ? ` ${clubRecord[exhibition.clubId].name}` : ''}, ${exhibition.location}`}
            image={exhibition.image}
            link={`/exhibition/nearexhibition/${exhibition.id}`}
          />
        ))}
      </List>
    </Page>
  );
};
export default NearExhibitionPage;
