import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../components/Page';
import ExhibitionCard from '../components/ExhibitionCard';
import lastEx from '../public/lastEx.jpg';
import nolastEX from '../public/nolastEX.jpg';
import { Grid } from '../components/UIKit/Grid';
import { ScreenLayout } from '../components/UIKit/ScreenLayout';
import { GridItem } from '../components/UIKit/GridItem';

const Exhibitions: NextPage = () => {
  return (
    <Page title="Выставки" meta="bla bla">
      <ScreenLayout>
        <Grid>
          <GridItem>
            <ExhibitionCard
              link={'/exhibition/nearexhibition'}
              hoverBlock={true}
              opacityBlock={true}
              title={'Ближайшие выставки'}
              text={'Информация о ближайшей выставке кошек КЛК Коргоруши г. Москва.'}
              // csssrc={styles.exhibition_Main__leftColumn}
              image={lastEx.src}
            />
          </GridItem>
          <GridItem>
            <ExhibitionCard
              link={'/exhibition/lastexhibition'}
              hoverBlock={true}
              opacityBlock={true}
              title={'Прошедшие выставки'}
              text={'Результаты и и фоторепортаж с прошедших выставок КЛК Коргоруши'}
              // csssrc={styles.exhibition_Main__rightColumn}
              image={nolastEX.src}
            />
          </GridItem>
          <div/>
        </Grid>
      </ScreenLayout>
    </Page>
  );
};

export default Exhibitions;
