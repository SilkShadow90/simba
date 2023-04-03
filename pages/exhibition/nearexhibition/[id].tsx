import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../../../components/Page';
import styles from '../../../styles/come.module.css';
import ExhibitionCard from '../../../components/ExhibitionCard';
import stars from '../../../public/stars.jpg';
import { useFetchService } from '../../../utils/useFetchService';
import { Strings } from '../../../resources';
import { Exhibition, User } from '../../../api/types';
import { useQuery } from '../../../redux/hooks';
import UserMethods from '../../../api/UserMethods';
import ExhibitionMethods from '../../../api/ExhibitionMethods';
import { Grid } from '../../../components/UIKit/Grid';
import { GridItem } from '../../../components/UIKit/GridItem';
import { ScreenLayout } from '../../../components/UIKit/ScreenLayout';
import { TextBlock } from '../../../components/UIKit/TextBlock';
import { Flex } from '../../../components/UIKit/Flex';

const NearestExhibition: NextPage = () => {
  const { id } = useQuery();

  const { data: usersData, loading: usersLoading } = useFetchService<User[]>(UserMethods.getAll);
  const {
    data: exhibition,
    loading: exhibitionLoading,
  } = useFetchService<Exhibition | null, string>(ExhibitionMethods.getById, id);

  return (
    <Page
      title="Ближайщие выставки"
      meta="bla bla"
      styles={styles.container}
      isLoading={usersLoading || exhibitionLoading}
    >
      {!!exhibition && (
        <ScreenLayout>
          <Flex flexDirection="column">
            <TextBlock type="H3">
              {Strings.maket(exhibition)}
            </TextBlock>
            <TextBlock type="Small">
              {'Что бы подать заявку на участие , необходимо связаться с руководителем выставки через вкладку контакты, а так же заполнить предварительно анкету и отправить ее нам'}
            </TextBlock>
          </Flex>
          <ScreenLayout>
            <TextBlock type="H2" centered>
              {'Судьи'}
            </TextBlock>
            <Grid>
              {usersData && usersData.map((user) => (
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
      )}
    </Page>
  );
};

export default NearestExhibition;
