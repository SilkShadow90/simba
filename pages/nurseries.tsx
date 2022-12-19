import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Partners.module.css';
import cattwo from "../public/cattwo.jpg";
import kzn from "../public/kzn.jpg";
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import {useFetchService} from "../utils/useFetchService";
import {Nurseries} from "./api/nurseries";
import Loader from "../components/Loader";
import {type} from "os";
import {number} from "prop-types";


const nurseries: NextPage = () => {
    const { data: nurseriesData } = useFetchService<Nurseries[]>('nurseries') || {};

    //
    // const earlyDate = (nextDate:string) => {
    //     const date:object = new Date();
    //
    //     return nextDate - Number(date);
    // }


    // console.log(earlyDate("2022-12-30"))
    // const options = {
    //     // era: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    //     weekday: 'long',
    //     timezone: 'UTC',
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     second: 'numeric'
    // };
    // @ts-ignore
    // console.log('date',date.toLocaleString("ru", options));

    // if (!nurseriesData) {
    //     return (
    //         <Loader isVisible={true} />
    //     );
    // }
    // console.log('nurseriesData',nurseriesData);
    return (
        <Page title="Питомники" meta="bla bla" styles={styles.container} >
            <div className={styles.partners_Main}>
                <h2>Питомники</h2>
                    <div className={styles.partners_info_Main}>
                        <ExhibitionCard
                            link={"/nurseries/nurseriesProfile/1"}
                            title={"«Golden Pride»"}
                            text={'Мейн-кун'}
                            csssrc={styles.nurseries_Main__src}
                            image={kzn.src}
                        />
                        <ExhibitionCard
                            link={"/nurseries/nurseriesProfile/2"}
                            title={"«BritishCO»"}
                            text={'Британцы'}
                            csssrc={styles.nurseries_Main__src}
                            image={cattwo.src}
                        />
                </div>
            </div>
        </Page>
    );
};

export default nurseries;