import type { NextPage } from 'next';
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Partners.module.css';
import cattwo from "../public/cattwo.jpg";
import kzn from "../public/kzn.jpg";
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import {useFetchService} from "../utils/useFetchService";
import { Nurser } from "./api/nurser/[id]";
import Loader from "../components/Loader";
import { earlyDate } from '../examples';

const NurseriesScreen: NextPage = () => {
    const { data: nurseriesData } = useFetchService<Nurser[]>('nurseries') || {};

    if (!nurseriesData) {
        return (
            <Loader isVisible={true} />
        );
    }
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

export default NurseriesScreen;
