import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';

import { Page } from '../../../components/Page';
import styles from '../../../styles/out.module.css';
import ExhibitionCard from '../../../components/Intro/ExhibitionCard';
import stars from '../../../public/stars.jpg';
import { useFetchService } from '../../../utils/useFetchService';
import { getDateString } from '../../../utils';
import { useQuery } from '../../../redux/hooks';
import UserMethods from '../../../api/UserMethods';
import ExhibitionMethods from '../../../api/ExhibitionMethods';
import DictionaryMethods from '../../../api/DictionaryMethods';

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

  const { data: cats, loading: catsLoading } = useFetchService(ExhibitionMethods.getExhibitionWinners, id);
  const { data: referees, loading: refereesLoading } = useFetchService(UserMethods.getExhibitionReferees, id);
  const { data: exhibition, loading: exhibitionLoading } = useFetchService(ExhibitionMethods.getById, id);
  const { data: exhibitionType, loading: typeLoading } = useFetchService(DictionaryMethods.getTypeRecord);
  const { data: breedRecord, loading: breedLoading } = useFetchService(DictionaryMethods.getBreedRecord);

  const type: string = useMemo(() => {
    if (exhibition?.typeId && exhibitionType) {
      return exhibitionType[exhibition?.typeId].name;
    }

    return '';
  }, [exhibition?.typeId, exhibitionType]);

  return (
    <Page
      title="Прошедшие выставки"
      meta="bla bla"
      styles={styles.container}
      isLoading={catsLoading || refereesLoading || exhibitionLoading || typeLoading || breedLoading}
    >
      {!!cats && !!referees && !!exhibition && breedRecord && (
        <div className={styles.exhibition_Main}>
          <div className={styles.outinfo}>
            <div>{getDateString(exhibition?.dateStart, exhibition?.dateEnd)} была проведена {type} выставка
              кошек
            </div>
          </div>
          <div className={styles.outinfo_title}>
          </div>
          <div className={styles.outwinner}>
            <div className={styles.outinfo}>Победители</div>
            <div className={styles.outwinner_dinner}>
              {cats && cats.map((cat) => (
                <ExhibitionCard
                  key={cat.id}
                  hoverBlock={true}
                  opacityBlock={true}
                  title={cat.name}
                  text={breedRecord[cat.breedId].name}
                  csssrc={styles.out_src_winner_one}
                  image={cat.image}
                  link={`/cats/${cat.id}`}
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
                  text={user.email}
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
