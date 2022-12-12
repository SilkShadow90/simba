import type { NextPage } from 'next';
import React from 'react';
import {useRouter} from "next/router";
import { Page } from '../components/Page';
import styles from '../styles/come.module.css';
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import stars from "../public/stars.jpg";
import { useFetchService } from '../utils/useFetchService';
import { User } from './api/users';
import Loader from '../components/Loader';

const сome: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: usersData } = useFetchService<User[]>('users') || {};

    if (!usersData) {
        return (
            <Loader isVisible={true} />
        );
    }

    return (
        <Page title="Ближайщие выставки" meta="bla bla" styles={styles.container} >
            <div className={styles.exhibition_Main}>
                <div className={styles.comeinfo}>
                    <div>Выставка кошек 10-11 октября 2020</div>
                </div>
                <div className={styles.comeinfo_title}>
                    10-11 октября 2020 г, прошла Международная выставка кошек РФОО Коргоруши, Москва
                </div>
                <div className={styles.comearbiter}>
                    <div className={styles.comeinfo}>Судьи</div>
                    <div className={styles.comearbiter_info}>
                        {!!usersData && usersData.map((user) => (
                          <ExhibitionCard
                            key={user.id}
                            title={user.name}
                            text={user.catName}
                            csssrc={styles.come_src_winner_one}
                            image={stars.src}
                            link={`user/${user.id}`}
                          />
                        ))}
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default сome;
