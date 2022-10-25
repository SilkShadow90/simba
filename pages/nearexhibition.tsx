import type { NextPage } from 'next'
import styles from '../styles/Nearex.module.css';
import React from 'react';
import {Page} from "../components/Page";
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import {FirstBack} from "../components/Back";

const nearexhibition: NextPage = () => {
    return (
        <Page title="Ближайщие выставки" meta="bla bla" styles={styles.container}>
            <div className={styles.nearlasthibition_header}>
                <FirstBack link={"/exhibition"}/>
                <div className={styles.nearlasthibition_title}>Ближайщие выставки</div>
            </div>
            <div className={styles.nearexhibition_Main}>
                <ExhibitionCard
                    link={"/come"}
                    title={"Выставка кошек"}
                    text={'Выставка в г.Ульяновске 10.03.2022 в 15:30'}
                    csssrc={styles.nearexhibition_Main__src}
                />
                <ExhibitionCard
                    link={"/come"}
                    title={"Выставка кошек"}
                    text={'Выставка в г.Ульяновске 14.05.2022 в 16:30'}
                    csssrc={styles.nearexhibition_Main__src}
                />
            </div>
            {/*<div className={styles.nearhibition_blocktextone}>*/}
            {/*    <div className={styles.nearhibitiontextone}>*/}
            {/*        Выставка кошек 11-12 декабря 2021 г Москва*/}
            {/*    </div>*/}
            {/*    <div className={styles.nearhibitiontexttwo}>*/}
            {/*        Приглашаем принять участие в Международной выставке кошек*/}
            {/*    </div>*/}
            {/*    <div className={styles.nearhibitiontextthree}>*/}
            {/*        06-07 марта 2022 г*/}
            {/*    </div>*/}
            {/*    <div className={styles.nearhibitiontexttwo}>*/}
            {/*        License L# 221052*/}
            {/*    </div>*/}
            {/*    <div className={styles.nearhibitiontextfour}>*/}
            {/*        Место проведения: ВВЦ, ТЦ РМ, 1-я Останкинская ул. 55*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Page>
    )
}
export default nearexhibition