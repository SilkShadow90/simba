import React from "react";
import styles from "../../../styles/adminStyles/AdminCatsPage.module.css";
import {AdminButton} from "../AdminButton";
import {AdminInputTab, Titles} from "../AdminInputTab";
import {useFetchService} from "../../../utils/useFetchService";
import {Cats} from "../../../pages/api/cats";
import Loader from "../../Loader";
import {AdminInputList} from "../AdminInputList";

const catTitles: Titles<Cats> = {
    name: 'Имя',
    breed: 'Порода',
    favorite: 'Избранное',
    club: 'Клуб',
}


export const CatsPage = () => {

    const { data: catsData } = useFetchService<Cats[]>('cats') || {};
    if (!catsData ) {
        return (
            <Loader isVisible={true} />
        );
    }
    const onSubmit = () => {
        console.log(catsData)
    }


    console.log(catsData)
    return (
        <>
            <div className={styles.openCatsFiltered}>
                <div className={styles.openCatsFiltered_left}>
                    <div>Filter</div>
                    <select className={styles.openCatsFiltered_left_select} name="all" id="1">
                        <option value="1">all</option>
                    </select>
                </div>
                <AdminButton type={"primary"} onClick={onSubmit} text={"Add Contact"}/>
            </div>
            {/*//todo Придумать как заталкать в один компонент*/}
            <div className={styles.openMainStart}>
                <AdminInputList
                    titles={catTitles}
                    items={catsData}
                />
            </div>
        </>
    );
};