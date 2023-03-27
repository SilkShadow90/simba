import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';

import { Page } from '../../../components/Page';
import styles from '../../../styles/out.module.css';
import ExhibitionCard from '../../../components/Intro/ExhibitionCard';
import stars from '../../../public/stars.jpg';
import { useFetchService } from '../../../utils/useFetchService';
import { getDateString } from '../../../utils';
import { Exhibition, User } from '../../../api/types';
import { useQuery } from '../../../redux/hooks';
import UserMethods from '../../../api/UserMethods';
import ExhibitionMethods from '../../../api/ExhibitionMethods';

function jpeg(size: number = 150) {
  return `https://source.unsplash.com/random/${size}`;
}

function getImages(length: number, size: number = 150) {
  return new Array(length).fill(null).map((_, index) => (
    <Image
      loader={() => jpeg(size)}
      src={jpeg(size)}
      key={index}
      width={`${size}px`}
      height={`${size}px`}
      objectFit={'none'}
    />
  ));
}

const Out: NextPage = () => {
  const { id } = useQuery();

  const { data: usersData, loading: userLoading } = useFetchService<User[], string>(UserMethods.getExhibitionWinners, id) || {};
  const { data: referees, loading: refereesLoading } = useFetchService<User[], string>(UserMethods.getExhibitionReferees, id) || {};
  const { data: exhibition, loading: exhibitionLoading } = useFetchService<Exhibition, string>(ExhibitionMethods.getExhibition, id) || {};

  return (
    <Page
      title="Прошедшие выставки"
      meta="bla bla"
      styles={styles.container}
      isLoading={userLoading || refereesLoading || exhibitionLoading}
    >
      {!!usersData && !!referees && !!exhibition && (
        <div className={styles.exhibition_Main}>
          <div className={styles.outinfo}>
            <div>{getDateString(exhibition?.dateStart, exhibition?.dateEnd)} была проведена {exhibition?.type} выставка
              кошек
            </div>
          </div>
          <div className={styles.outinfo_title}>
          </div>
          <div className={styles.outwinner}>
            <div className={styles.outinfo}>Победители</div>
            <div className={styles.outwinner_dinner}>
              {usersData && usersData.map((user) => (
                <ExhibitionCard
                  hoverBlock={true}
                  opacityBlock={true}
                  key={user.id}
                  title={user.name}
                  text={user.catName}
                  csssrc={styles.out_src_winner_one}
                  image={stars.src}
                  link={`/user/${user.id}`}
                />
              ))}
            </div>
          </div>
          <div className={styles.outarbiter}>
            <div className={styles.outinfo}>Судьи</div>
            <div className={styles.outarbiter_info}>
              {!!referees && referees.map((user) => (
                <ExhibitionCard
                  hoverBlock={true}
                  opacityBlock={true}
                  key={user.id}
                  title={user.name}
                  text={user.catName}
                  csssrc={styles.out_src_winner_one}
                  image={stars.src}
                  link={`/user/${user.id}`}
                />
              ))}
            </div>
          </div>
          <div className={styles.outphotos}>
            <div className={styles.outinfo}>Фотографии с выставки</div>
            {/* <div className={styles.outinfo_title}> */}
            {/*    /!*#todo починить*!/ */}
            {/*    {getDateString(exhibition.dateStart, exhibition.dateEnd)} */}
            {/* </div> */}
            <div className={styles.outarbiter_info}>
              {getImages(30, 300)}
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default Out;
