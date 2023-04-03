import type { NextPage } from 'next';
import React, { useMemo } from 'react';
import { Strings } from '../resources';
import { Page } from '../components/Page';
import { Intro } from '../components/Intro';
import { Slider, SliderItem } from '../components/Slider';
import showcat from '../public/showcat.jpg';
import kittens from '../public/kittens.jpg';
import catteries from '../public/catteries.jpg';
import wch from '../public/wch.jpg';
import { Faq } from '../components/Faq';
import { NavigationCard } from '../components/NavigationCard';

import catzz from '../public/catzz.jpg';
import fish from '../public/fish.jpg';
import cosmo from '../public/cosmo.jpg';
import forest from '../public/forest.jpg';
import grass from '../public/list.jpg';
import { TextBlock } from '../components/UIKit/TextBlock';
import { ScreenLayout } from '../components/UIKit/ScreenLayout';
import { Grid } from '../components/UIKit/Grid';
import { GridItem } from '../components/UIKit/GridItem';

const Home: NextPage = () => {
  const sliderDataList: SliderItem[] = useMemo(() => [
    {
      title: 'Вступить в клуб',
      onClick: () => null,
      image: catzz,
    },
    {
      title: '',
      onClick: () => null,
      image: fish,
    },
    {
      title: '',
      onClick: () => null,
      image: cosmo,
    },
    {
      title: '',
      onClick: () => null,
      image: forest,
    },
    {
      title: '',
      onClick: () => null,
      image: grass,
    },
  ], []);

  return (
    <Page title="Home" meta="bla bla">
      <Slider data={sliderDataList} />
      <ScreenLayout stretch>
        <TextBlock type="H1" centered>{Strings.main.title}</TextBlock>
        <ScreenLayout>
          <Grid
            gridTemplateColumns={'repeat(3, 1fr)'}
            gridTemplateRows={'repeat(2, 240px)'}
            gridTemplateAreas={'"a b c" "a b d"'}
          >
            <GridItem gridArea="a">
              <NavigationCard title={'Выставки'} image={showcat} url={'exhibitions'} />
            </GridItem>
            <GridItem gridArea="b">
              <NavigationCard title={'Кошки'} image={kittens} url={'cats'} />
            </GridItem>
            <GridItem gridArea="c">
              <NavigationCard title={'Питомники'} image={catteries} url={'nurseries'} />
            </GridItem>
            <GridItem gridArea="d">
              <NavigationCard title={'Документы'} image={wch} url={'docs'} />
            </GridItem>
          </Grid>
        </ScreenLayout>
        <Intro />
        <ScreenLayout>
          <TextBlock type="H2" centered>{Strings.main.faq}</TextBlock>
          <Grid gridTemplateColumns={'repeat(2, 1fr)'}>
            <Faq />
          </Grid>
        </ScreenLayout>
      </ScreenLayout>
    </Page>
  );
};

export default Home;
