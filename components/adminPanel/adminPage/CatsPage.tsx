import React, { useCallback } from 'react';
import styles from '../../../styles/adminStyles/AdminCatsPage.module.css';
import { AdminButton } from '../AdminButton';
import { Titles } from '../types';
import { useFetchService } from '../../../utils/useFetchService';
import Loader from '../../Loader';
import { AdminInputList } from '../AdminInputList';
import { Cat } from '../../../api/types';
import CatMethods from '../../../api/CatMethods';
import { ToastService } from '../../../utils/ToastService';

const catTitles: Titles<Cat> = {
  name: 'Имя',
  breedId: 'Порода',
  favorite: 'Избранное',
  clubId: 'Клуб',
};

export const CatsPage = () => {
  const { data: catsData, loading, fetchData: fetchCats } = useFetchService<Cat[]>(CatMethods.getAll);

  const { loading: createCatLoading, fetchData: fetchCreateCat } = useFetchService<void, Cat>({
    methodFunc: CatMethods.create,
    pending: true,
    successCallback: fetchCats
  });


  const onCreate = useCallback(() => {
    // fetchCreateCat({
    //   name: "Васян 2.0",
    //   breed: "Веслоухая британская",
    //   image: "/cat.jpg",
    //   csssrc: "styles.cats_Main__src",
    //   favorite: true,
    //   club: "Golder Pride"
    // });
  }, [fetchCreateCat]);

  if (loading || createCatLoading) {
    return (
      <Loader isVisible={true}/>
    );
  }

  return (
    <>
      <div className={styles.openCatsFiltered}>
        <div className={styles.openCatsFiltered_left}>
          <div>Filter</div>
          <select className={styles.openCatsFiltered_left_select} name="all" id="1">
            <option value="1">all</option>
          </select>
        </div>
        <AdminButton type={'primary'} onClick={onCreate} text={'Добавить животное'}/>
      </div>
      <div className={styles.openMainStart}>
        {!!catsData && (
          <AdminInputList
            titles={catTitles}
            items={catsData}
          />
        )}
      </div>
    </>
  );
};
