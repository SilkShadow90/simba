import type { NextPage } from 'next';
import React from 'react';
import { useRouter } from "next/router";
import { Page } from '../../components/Page';
import styles from '../../styles/Partners.module.css';
import {useFetchService} from "../../utils/useFetchService";
import ExhibitionCard from "../../components/Intro/ExhibitionCard";
import { Nurser } from '../../api/types';

const NurseriesProfile: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: nurseriesData } = useFetchService<Nurser>('nurseries/id', { id: id as string }) || {};

    if (!nurseriesData) {
        return null;
    }
    console.log(nurseriesData);

    return (
        <Page title="Партнеры" meta="bla bla" styles={styles.container} >
            <div className={styles.partners_Main}>
                <div className={styles.partners_logo}>
                    <div className={styles.partners_logos}>
                        <ExhibitionCard
                            opacityBlock={false}
                            key={""}
                            title={""}
                            text={""}
                            csssrc={styles.partners_Main__src}
                            image={nurseriesData.image}
                            link={"#"}
                        />
                    </div>
                    <div className={styles.partners_info_Main}>
                        <h3>«{nurseriesData.worked}»</h3>
                        <div className={styles.partners_info}>********************************** </div>
                        <div className={styles.partners_info}>********************************</div>
                        <div className={styles.partners_info}>***********</div>
                        <div className={styles.partners_info}>http://goldenpride.ulsimba.ru/</div>
                        <div className={styles.partners_info}>Наш питомник образован в 1998  году и занимался изначально разведением кошек британской короткошерстной и
                            шотландской вислоухой. Девять лет назад к нам в дом попала кошка породы мейн-кун из Тольяттинского питомника «Тигриный Дух»
                            Патрисия Виваче Тигриный Дух,
                            а по-домашнему просто Патя. Эта кошка перевернула наше представление о кошках вообще.
                        </div>
                        <div className={styles.partners_info}>Мейн-кун – удивительная кошка, вызывающая уважение и трепет.
                        В этом американском гиганте (самая большая кошка в мире среди домашних пород) поразительно сочетаются благородная сила,
                        утонченная грация и мягкий характер. Звуки, которые издают коты породы мейн-кун, напоминают мягкое курлыканье.
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default NurseriesProfile;
