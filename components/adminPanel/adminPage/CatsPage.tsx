import React, {useCallback, useState} from 'react';
import styles from '../../../styles/adminStyles/AdminCatsPage.module.css';
import { AdminButton } from '../AdminButton';
import { Titles } from '../types';
import { useFetchService } from '../../../utils/useFetchService';
import Loader from '../../Loader';
import { AdminInputList } from '../AdminInputList';
import { Cat } from '../../../api/types';
import CatMethods from '../../../api/CatMethods';
import {AdminModal} from "../AdminModal";

const catTitles: Titles<Cat> = {
  name: 'Имя',
  breedId: 'Порода',
  favorite: 'Избранное',
  clubId: 'Клуб',
};

const catBoilerplate = {
  "name": "",
  "breedId": "",
  "masterId": "",
  "image": "",
  "favorite": false,
  "clubId": "",
  "exhibitionIds": [],
  "exhibitionWinnerIds": []
}

export const CatsPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const toggleModal = useCallback(() => {
    setModalActive((prevState) => !prevState);
  }, []);

  const closeModal = useCallback(() => {
    setModalActive(false);
  }, []);

  const { data: catsData, loading, fetchData: fetchCats } = useFetchService<Cat[]>(CatMethods.getAll);

  const { loading: createCatLoading, fetchData: fetchCreateCat } = useFetchService<void, Cat>({
    methodFunc: CatMethods.create,
    pending: true,
    successCallback: () => {
      closeModal()
      fetchCats()
    },
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
  const { loading: updateCatLoading,  fetchData: fetchUpdateCat } = useFetchService<void, Cat>({
    methodFunc: CatMethods.update,
    pending: true,
    successCallback: fetchCats
  });

  const { loading: deleteCatLoading, fetchData: fetchDeleteCat } = useFetchService({
    methodFunc: CatMethods.delete,
    pending: true,
    successCallback: fetchCats
  });
  const { loading: multiDeleteCatLoading, fetchData: fetchMultiDeleteCat } = useFetchService({
    methodFunc: CatMethods.multiDelete,
    pending: true,
    successCallback: fetchCats
  });

  const onUpdate = useCallback((cat: Cat) => {
    fetchUpdateCat(cat)
  },[fetchUpdateCat]);

  const onDelete = useCallback((id:string) => {
    fetchDeleteCat(id);
  }, [fetchDeleteCat]);

  const onMultiDelete = useCallback((ids:string[]) => {
    fetchMultiDeleteCat(ids);
  }, [fetchMultiDeleteCat]);



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
        <AdminButton type={'primary'} onClick={toggleModal}  text={'Добавить животное'}/>
      </div>
      <div className={styles.openMainStart}>
        {!!catsData && (
          <AdminInputList
            updateLoader={updateCatLoading}
            updateHandler={onUpdate}
            multiDeleteHandler={onMultiDelete}
            deleteHandler={onDelete}
            titles={catTitles}
            items={catsData}
          />
        )}
      </div>
      <AdminModal item={catBoilerplate} titles={catTitles} active={modalActive} closeModal={closeModal} onSubmit={fetchCreateCat} loading={createCatLoading}/>
    </>
  );
};
