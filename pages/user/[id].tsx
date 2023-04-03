import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../../components/Page';
import styles from '../../styles/user.module.css';
import ExhibitionCard from '../../components/ExhibitionCard';
import { useFetchService } from '../../utils/useFetchService';
import { useQuery } from '../../redux/hooks';
import UserMethods from '../../api/UserMethods';
import DictionaryMethods from '../../api/DictionaryMethods';
import CatMethods from '../../api/CatMethods';
import { ScreenLayout } from '../../components/UIKit/ScreenLayout';
import { Grid } from '../../components/UIKit/Grid';
import { GridItem } from '../../components/UIKit/GridItem';
import { TextBlock } from '../../components/UIKit/TextBlock';
import { Flex } from '../../components/UIKit/Flex';

const Id: NextPage = () => {
  const { id } = useQuery();

  const { data: user, loading } = useFetchService(UserMethods.getById, id);
  const { data: breedRecord, loading: breedLoading } = useFetchService(DictionaryMethods.getBreedRecord);
  const { data: cats, loading: catsLoading } = useFetchService(CatMethods.getByIds, user?.catsIds);

  return (
    <Page
      title="Информация пользователя"
      meta="bla bla"
      styles={styles.container}
      isLoading={loading || breedLoading || catsLoading}
    >
      {!!user && breedRecord && (
        <ScreenLayout>
          <Grid>
            <GridItem>
              <ExhibitionCard
                hoverBlock={false}
                opacityBlock={false}
                title={user.name}
                text={user.email}
                link={'#'}
                image={user.image}
              />
            </GridItem>
            <GridItem>
              <Flex flexDirection="column">
                <TextBlock type="H2" centered>
                  {'Информация пользователя'}
                </TextBlock>

                <TextBlock type="Body">
                  {'ФИО: '}
                  <TextBlock type="Body">
                    {user.name}
                  </TextBlock>
                </TextBlock>
                <TextBlock type="Body">
                  {'Телефон: '}
                  <TextBlock type="Link">
                    {user.phone}
                  </TextBlock>
                </TextBlock>
                <TextBlock type="Body">
                  {'Email: '}
                  <TextBlock type="Link">
                    {user.email}
                  </TextBlock>
                </TextBlock>
              </Flex>
            </GridItem>
          </Grid>

          {!!cats && (
            <ScreenLayout>
              <TextBlock type="H3" centered>
                {'Животные'}
              </TextBlock>
              <Grid>
                {cats?.map(cat => (
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
        </ScreenLayout>
      )}
    </Page>
  );
};

export default Id;
