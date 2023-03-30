import React from 'react';
import type { NextPage } from 'next';
import { Page } from '../../components/Page';
import styles from '../../styles/Partners.module.css';
import { useFetchService } from '../../utils/useFetchService';
import ExhibitionCard from '../../components/ExhibitionCard';
import { Nurser } from '../../api/types';
import { useQuery } from '../../redux/hooks';
import NurserMethods from '../../api/NurserMethods';

const NurseriesProfile: NextPage = () => {
  const { id } = useQuery();

  const { data: nurseriesData, loading } = useFetchService<Nurser, string>(NurserMethods.getById, id);

  return (
    <Page title="Партнеры" meta="bla bla" styles={styles.container} isLoading={loading}>
      {nurseriesData && (
        <div className={styles.partners_Main}>
          <div className={styles.partners_logo}>
            <div className={styles.partners_logos}>
              <ExhibitionCard
                opacityBlock={false}
                key={''}
                title={''}
                text={''}
                image={nurseriesData.image}
                link={'#'}
              />
            </div>
            <div className={styles.partners_info_Main}>
              <h3>«{nurseriesData.worked}»</h3>
              <div className={styles.partners_info}>**********************************</div>
              <div className={styles.partners_info}>********************************</div>
              <div className={styles.partners_info}>***********</div>
              <div className={styles.partners_info}>http://goldenpride.ulsimba.ru/</div>
              <div className={styles.partners_info}>Наш питомник образован в 1998 году и занимался изначально
                разведением кошек британской короткошерстной и
                шотландской вислоухой. Девять лет назад к нам в дом попала кошка породы мейн-кун из Тольяттинского
                питомника «Тигриный Дух»
                Патрисия Виваче Тигриный Дух,
                а по-домашнему просто Патя. Эта кошка перевернула наше представление о кошках вообще.
              </div>
              <div className={styles.partners_info}>Мейн-кун – удивительная кошка, вызывающая уважение и трепет.
                В этом американском гиганте (самая большая кошка в мире среди домашних пород) поразительно сочетаются
                благородная сила,
                утонченная грация и мягкий характер. Звуки, которые издают коты породы мейн-кун, напоминают мягкое
                курлыканье.
              </div>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default NurseriesProfile;
