import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../components/Page';
import ExhibitionCard from '../components/ExhibitionCard';
import { Grid } from '../components/UIKit/Grid';
import { ScreenLayout } from '../components/UIKit/ScreenLayout';
import { GridItem } from '../components/UIKit/GridItem';
import { TextBlock } from '../components/UIKit/TextBlock';

const Exhibitions: NextPage = () => {
  return (
    <Page title="Выставки" meta="bla bla">
      <ScreenLayout>
        <TextBlock type={'H1'}>
          {'Выставки'}
        </TextBlock>
        <Grid>
          <GridItem>
            <ExhibitionCard
              link={'/exhibition/nearexhibition'}
              hoverBlock={true}
              opacityBlock={true}
              title={'Ближайшие выставки'}
              text={'Информация о ближайшей выставке кошек КЛК Коргоруши г. Москва.'}
              image={'/lastEx.jpg'}
            />
          </GridItem>
          <GridItem>
            <ExhibitionCard
              link={'/exhibition/lastexhibition'}
              hoverBlock={true}
              opacityBlock={true}
              title={'Прошедшие выставки'}
              text={'Результаты и и фоторепортаж с прошедших выставок КЛК Коргоруши'}
              image={'/nolastEX.jpg'}
            />
          </GridItem>
          <div/>
        </Grid>
      </ScreenLayout>
    </Page>
  );
};

export default Exhibitions;
