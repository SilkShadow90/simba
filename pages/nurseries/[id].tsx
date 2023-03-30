import React from 'react';
import type { NextPage } from 'next';
import { Page } from '../../components/Page';
import styles from '../../styles/Cats.module.css';
import { useFetchService } from '../../utils/useFetchService';
import ExhibitionCard from '../../components/ExhibitionCard';
import { Nurser } from '../../api/types';
import { useQuery } from '../../redux/hooks';
import NurserMethods from '../../api/NurserMethods';
import { ScreenLayout } from '../../components/UIKit/ScreenLayout';
import { Grid } from '../../components/UIKit/Grid';
import { GridItem } from '../../components/UIKit/GridItem';
import { TextBlock } from '../../components/UIKit/TextBlock';

const NurseriesProfile: NextPage = () => {
  const { id } = useQuery();

  const { data: nurseriesData, loading } = useFetchService<Nurser, string>(NurserMethods.getById, id);

  return (
    <Page title="Партнеры" meta="bla bla" styles={styles.container} isLoading={loading}>
      {nurseriesData && (
        <ScreenLayout>
          <Grid gridTemplateColumns="repeat(3, 1fr)">
            <GridItem>
              <ExhibitionCard
                opacityBlock={false}
                key={''}
                title={''}
                text={''}
                image={nurseriesData.image}
                link={'#'}
              />
            </GridItem>
            <GridItem styleProps={styles.catInfo}>
              <TextBlock type="H3">«{nurseriesData.worked}»</TextBlock>
              <TextBlock type="Body">http://goldenpride.ulsimba.ru/</TextBlock>
              <TextBlock type="Body">Наш питомник образован в 1998 году и занимался изначально
                разведением кошек британской короткошерстной и
                шотландской вислоухой. Девять лет назад к нам в дом попала кошка породы мейн-кун из Тольяттинского
                питомника «Тигриный Дух»
                Патрисия Виваче Тигриный Дух,
                а по-домашнему просто Патя. Эта кошка перевернула наше представление о кошках вообще.
              </TextBlock>
              <TextBlock type="Body">Мейн-кун – удивительная кошка, вызывающая уважение и трепет.
                В этом американском гиганте (самая большая кошка в мире среди домашних пород) поразительно сочетаются
                благородная сила,
                утонченная грация и мягкий характер. Звуки, которые издают коты породы мейн-кун, напоминают мягкое
                курлыканье.
              </TextBlock>
            </GridItem>
          </Grid>
        </ScreenLayout>
      )}
    </Page>
  );
};

export default NurseriesProfile;
