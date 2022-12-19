import React from 'react';
import type { NextPage } from 'next';
import Image from "next/image";
import { useRouter } from 'next/router';

import { Page } from '../../../../components/Page';
import styles from '../../../../styles/out.module.css';
import ExhibitionCard from "../../../../components/Intro/ExhibitionCard";
import stars from '../../../../public/stars.jpg';
import {useFetchService} from "../../../../utils/useFetchService";
import {User} from "../../../api/users";
import Loader from "../../../../components/Loader";

function jpeg(size: number = 150) {
    return `https://source.unsplash.com/random/${size}`;
}

function getImages(length: number, size: number = 150) {
    return new Array(length).fill(null).map((_, index) => (
        <Image loader={() => jpeg(size)} src={jpeg(size)} key={index} width={`${size}px`} height={`${size}px`} objectFit={'none'}/>
    ));
}


const out: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { id } = router.query;
    const { data: usersData } = useFetchService<User[]>('users') || {};

    if (!usersData) {
        return (
            <Loader isVisible={true} />
        );
    }


    console.log('user',usersData);

    return (
        <Page title="Прошедшие выставки" meta="bla bla" styles={styles.container} >
            <div className={styles.exhibition_Main}>
                <div className={styles.outinfo}>
                    <div>Выставка кошек 10-11 октября 2020</div>
                </div>
                <div className={styles.outinfo_title}>
                    10-11 октября 2020 г, прошла Международная выставка кошек РФОО Коргоруши, Москва
                </div>
                <div className={styles.outwinner}>
                    <div className={styles.outinfo}>Победители</div>
                    <div className={styles.outwinner_dinner}>
                        {usersData.map((user) => (
                            <ExhibitionCard
                                key={user.id}
                                title={user.name}
                                text={user.catName}
                                csssrc={styles.out_src_winner_one}
                                image={stars.src}
                                link={`/user/${user.id}`}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.outarbiter}>
                    <div className={styles.outinfo}>Судьи</div>
                    <div className={styles.outarbiter_info}>
                        {!!usersData && usersData.map((user) => (
                            <ExhibitionCard
                                key={user.id}
                                title={user.name}
                                text={user.catName}
                                csssrc={styles.out_src_winner_one}
                                image={stars.src}
                                link={`/user/${user.id}`}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.outphotos}>
                    <div className={styles.outinfo}>Фотографии</div>
                    <div className={styles.outinfo_title}>
                        1 день 10 октября 2020
                    </div>
                    <div className={styles.outarbiter_info}>
                        {getImages(30, 300)}
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default out;
