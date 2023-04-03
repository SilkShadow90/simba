import React, { useMemo } from 'react';
import type { NextPage } from 'next';

import { Page } from '../../../components/Page';
import styles from '../../../styles/out.module.css';
import ExhibitionCard from '../../../components/ExhibitionCard';
import stars from '../../../public/stars.jpg';
import { useFetchService } from '../../../utils/useFetchService';
import { getDateString } from '../../../utils';
import { useQuery } from '../../../redux/hooks';
import UserMethods from '../../../api/UserMethods';
import ExhibitionMethods from '../../../api/ExhibitionMethods';
import DictionaryMethods from '../../../api/DictionaryMethods';
import { ScreenLayout } from '../../../components/UIKit/ScreenLayout';
import { Grid } from '../../../components/UIKit/Grid';
import { TextBlock } from '../../../components/UIKit/TextBlock';
import { GridItem } from '../../../components/UIKit/GridItem';
import { Flex } from '../../../components/UIKit/Flex';
import { Slider, SliderItem } from '../../../components/Slider';

function jpeg(size: number = 150) {
  return `https://source.unsplash.com/random/${size}`;
}

function getImages(length: number, size: number = 150): SliderItem[] {
  return new Array(length).fill(null).map(() => ({
    image: jpeg(size)
  }));
}

const Out: NextPage = () => {
  const { id } = useQuery();

  const { data: cats, loading: catsLoading } = useFetchService(ExhibitionMethods.getExhibitionWinners, id);
  const { data: referees, loading: refereesLoading } = useFetchService(UserMethods.getExhibitionReferees, id);
  const { data: exhibition, loading: exhibitionLoading } = useFetchService(ExhibitionMethods.getById, id);
  const { data: exhibitionType, loading: typeLoading } = useFetchService(DictionaryMethods.getTypeRecord);
  const { data: breedRecord, loading: breedLoading } = useFetchService(DictionaryMethods.getBreedRecord);

  const type: string = useMemo(() => {
    if (exhibition?.typeId && exhibitionType) {
      return exhibitionType[exhibition?.typeId]?.name;
    }

    return '';
  }, [exhibition?.typeId, exhibitionType]);

  const images = useMemo(() => getImages(10, 300), []);

  return (
    <Page
      title="Прошедшие выставки"
      meta="bla bla"
      styles={styles.container}
      isLoading={catsLoading || refereesLoading || exhibitionLoading || typeLoading || breedLoading}
    >
      {!!cats && !!referees && !!exhibition && breedRecord && (
        <ScreenLayout stretch marginVertical={0}>
          <ScreenLayout>
            <Flex>
              <TextBlock type="H3">
                {`${getDateString(exhibition?.dateStart, exhibition?.dateEnd)} была проведена ${type} выставка кошек`}
              </TextBlock>
            </Flex>
            {!!cats?.length && (
              <ScreenLayout>
                <TextBlock type="H2" centered>
                  {'Победители'}
                </TextBlock>
                <Grid>
                  {cats.map((cat) => (
                    <GridItem key={cat.id}>
                      <ExhibitionCard
                        hoverBlock={true}
                        opacityBlock={true}
                        title={cat.name}
                        text={breedRecord[cat.breedId]?.name}
                        image={cat.image}
                        link={`/cats/${cat.id}`}
                      />
                    </GridItem>
                  ))}
                </Grid>
              </ScreenLayout>
            )}
            <ScreenLayout>
              <TextBlock type="H2" centered>
                {'Судьи'}
              </TextBlock>
              <Grid>
                {!!referees && referees.map((user) => (
                  <GridItem key={user.id}>
                    <ExhibitionCard
                      hoverBlock={true}
                      opacityBlock={true}
                      title={user.name}
                      text={user.email}
                      image={stars.src}
                      link={`/user/${user.id}`}
                    />
                  </GridItem>
                ))}
              </Grid>
            </ScreenLayout>
          </ScreenLayout>
          <TextBlock type="H2" centered>
            {'Фотографии с выставки'}
          </TextBlock>
          <Slider data={images} />
        </ScreenLayout>
      )}
    </Page>
  );
};

export default Out;
