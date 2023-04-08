import type { NextPage } from 'next';
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
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


  const stariyObj = {
    "system_object_id": null,
    "archived": {"QWE_QWE":"hello"},
    "CODE": "before_sleep",
    "signature_date": null,
    "is_deleted": false,
    "global_id": "1204005081",
    "TITLE": "перед сном"
  }

  const megaObj = <T extends {}>(obj: T) => {
    const mutatedObj = Object.entries<any>(obj);
    const mutter: Array<[string, any]> = mutatedObj
      .map(([key,value]) => {
        const camelKey = key.toLowerCase().split("_")
          .map((str, index) => (index ? str[0].toUpperCase() + str.slice(1) : str))
          .join("")

        if (typeof value === "object" && value !== null) {
          return [camelKey, megaObj(value)]
        }

        return [camelKey, value]
      })

    return Object.fromEntries(mutter)
  }

  console.log(megaObj(stariyObj))




  const router = useRouter();
  const sliderDataList: SliderItem[] = useMemo(() => [
    {
      title: 'Вступить в клуб',
      onClick: () => router.push('/docs?doc=1'),
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
  ], [router]);

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
