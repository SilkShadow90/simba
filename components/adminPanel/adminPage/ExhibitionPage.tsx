import React from "react";
import styles from "../../../styles/adminStyles/AdminExhibitionPage.module.css";
import {AdminButton} from "../AdminButton";
import {AdminInputTab, Titles} from "../AdminInputTab";
import {useFetchService} from "../../../utils/useFetchService";
import {Exhibition} from "../../../pages/api/allExhibition";
import Loader from "../../Loader";
import {AdminInputList} from "../AdminInputList";
import {Cats} from "../../../pages/api/cats";


const exhibitionTitles: Titles<Exhibition> = {
    location: 'Местоположение',
    type: 'Тип',
    club: 'Клуб',
    dateStart: 'Дата начала',
    dateEnd:'Дата конца'
}

export const ExhibitionPage = () => {

    const { data: exhibitionData } = useFetchService<Exhibition[]>('allExhibition') || {};
    if ( !exhibitionData) {
        return (
            <Loader isVisible={true} />
        );
    }
    console.log(exhibitionData)

    const onSubmit = () => {
        console.log(exhibitionData)
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
                <AdminButton type={"primary"} onClick={onSubmit} text={"Add Contact"}/>
            </div>
            <div className={styles.openMainStart}>
                <AdminInputList
                    titles={exhibitionTitles}
                    items={exhibitionData}
                />
            </div>
        </>
    );
};