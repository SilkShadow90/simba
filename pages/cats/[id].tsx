import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../../components/Page';
import styles from '../../styles/Cats.module.css';
import { useFetchService } from "../../utils/useFetchService";
import ExhibitionCard from "../../components/ExhibitionCard";
import { Club } from '../../api/types';
import { useQuery } from '../../redux/hooks';
import CatMethods from '../../api/CatMethods';
import DictionaryMethods from '../../api/DictionaryMethods';
import ClubMethods from '../../api/ClubMethods';
import { ScreenLayout } from '../../components/UIKit/ScreenLayout';
import { Grid } from '../../components/UIKit/Grid';
import { GridItem } from '../../components/UIKit/GridItem';
import { TextBlock } from '../../components/UIKit/TextBlock';

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
        <>
          <ScreenLayout>
            <Grid gridTemplateColumns="repeat(3, 1fr)">
              <GridItem>
                <ExhibitionCard
                  opacityBlock={false}
                  title={""}
                  text={""}
                  image={cats.image}
                  link={"#"}
                />
              </GridItem>
              <GridItem styleProps={styles.catInfo}>
                <TextBlock type="H2">
                  {cats.name}
                </TextBlock>
                <TextBlock type="Body">
                  {'Кличка: '}
                  <TextBlock type="Body">{breedRecord[cats.breedId]?.name}</TextBlock>
                </TextBlock>
                <TextBlock type="Body">
                  {'Клуб: '}
                  <TextBlock type="Body">{clubRecord[cats.clubId]?.name}</TextBlock>
                </TextBlock>
                <TextBlock type="Body">контакты</TextBlock>
                <TextBlock type="Body">http://goldenpride.ulsimba.ru/</TextBlock>
              </GridItem>
            </Grid>
          </ScreenLayout>
        </>
      )}
    </Page>
  );
};

export default CatPage;
