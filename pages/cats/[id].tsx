import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { Page } from '../../components/Page';
import styles from '../../styles/Partners.module.css';
import { useFetchService } from "../../utils/useFetchService";
import ExhibitionCard from "../../components/Intro/ExhibitionCard";
import { Cat } from '../../api/types';

const CatPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: catsData } = useFetchService<Cat>('cats/id', { id: id as string }) || {};

    if (!catsData) {
        return null;
    }

    return (
        <Page title="Профиль кошки" meta="bla bla" styles={styles.container} >
            <div className={styles.partners_Main}>
                <div className={styles.partners_logo}>

                    <div className={styles.partners_logos}>
                        <ExhibitionCard
                            opacityBlock={false}
                            key={""}
                            title={""}
                            text={""}
                            csssrc={styles.partners_Main__src}
                            image={catsData.image}
                            link={"#"}
                        />
                    </div>
                    <div className={styles.partners_info_Main}>
                        <h3>{catsData.name}</h3>
                        <div className={styles.partners_info}>{catsData.breed}</div>
                        <div className={styles.partners_info}>{catsData.club}</div>
                        <div className={styles.partners_info}>контакты</div>
                        <div className={styles.partners_info}>http://goldenpride.ulsimba.ru/</div>
                        <div className={styles.partners_info}>контакты
                        </div>
                        <div> контакты
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default CatPage;
