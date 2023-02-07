import React from 'react';
import type { NextPage } from 'next';
import Image from "next/image";
import { useRouter } from 'next/router';

import { Page } from '../../../components/Page';
import styles from '../../../styles/out.module.css';
import ExhibitionCard from "../../../components/Intro/ExhibitionCard";
import stars from '../../../public/stars.jpg';
import {useFetchService} from "../../../utils/useFetchService";
import {User} from "../../api/users";
import Loader from "../../../components/Loader";
import {Lastexhibition} from "../../api/lastexhibition";
import {getDateString} from "../../../utils";

function jpeg(size: number = 150) {
    return `https://source.unsplash.com/random/${size}`;
}

function getImages(length: number, size: number = 150) {
    return new Array(length).fill(null).map((_, index) => (
        <Image loader={() => jpeg(size)} src={jpeg(size)} key={index} width={`${size}px`} height={`${size}px`} objectFit={'none'}/>
    ));
}

const Out: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: usersData } = useFetchService<User[]>('exhibitionsWinner', { id: id as string }) || {};
    const { data: referees } = useFetchService<User[]>('exhibitionReferees', { id: id as string }) || {};
    const { data: lastexhibitionData } = useFetchService<Lastexhibition[]>('lastexhibition') || {};

    const { data: exhibition } = useFetchService<any>('exhibition',{ id: id as string }) || {};
    console.log("ex",exhibition)

    if (!lastexhibitionData) {
        return (
            <Loader isVisible={true} />
        );
    }

    if (!usersData || !referees) {
        return (
            <Loader isVisible={true} />
        );
    }

    return (
        <Page title="Прошедшие выставки" meta="bla bla" styles={styles.container} >
            <div className={styles.exhibition_Main}>
                <div className={styles.outinfo}>
                    <div>{getDateString(exhibition?.dateStart, exhibition?.dateEnd)} была проведена {exhibition?.type} выставка кошек</div>
                </div>
                <div className={styles.outinfo_title}>
                    {/*{`${getDateString(lastexhibition.dateStart, lastexhibition.dateEnd)}, прошла${lastexhibition.type ? ` ${lastexhibition.type}` : ''}*/}
                    {/* выставка кошек${lastexhibition.club ? ` ${lastexhibition.club}` : ''}, ${lastexhibition.location}`}*/}
                </div>
                <div className={styles.outwinner}>
                    <div className={styles.outinfo}>Победители</div>
                    <div className={styles.outwinner_dinner}>
                        {usersData && usersData.map((user) => (
                            <ExhibitionCard
                                hoverBlock={true}
                                opacityBlock={true}
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
                        {!!referees && referees.map((user) => (
                            <ExhibitionCard
                                hoverBlock={true}
                                opacityBlock={true}
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
                    <div className={styles.outinfo}>Фотографии с выставки</div>
                    {/*<div className={styles.outinfo_title}>*/}
                    {/*    /!*#todo починить*!/*/}
                    {/*    {getDateString(exhibition.dateStart, exhibition.dateEnd)}*/}
                    {/*</div>*/}
                    <div className={styles.outarbiter_info}>
                        {getImages(30, 300)}
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default Out;
