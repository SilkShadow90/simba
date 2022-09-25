import type { NextPage } from 'next'
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/user.module.css';
import ExhibitionCard from "../components/Intro/ExhibitionCard";

const user: NextPage = () => {
    return (
        <Page title="Информация пользователя" meta="bla bla" styles={styles.container} >
            <div className={styles.usermain}>
                <div className={styles.usercard}>
                    <ExhibitionCard
                        title={'Иван Петрович Затравкин'}
                        text={'Кот Лезвие'}
                        csssrc={styles.user_src}
                        link={''}
                    />
                    <div className={styles.usermain_block}>
                        <div className={styles.usermain_block_header}>
                            Информация пользователя
                        </div>
                        <div className={styles.usermain_block_title}>
                            <div>
                                ФИО:
                            </div>
                            <div className={styles.usermain_block_title_info}>
                                Иван Петрович Затравкин
                            </div>
                        </div>
                        <div className={styles.usermain_block_title}>
                            <div>
                                Порода кота
                            </div>
                            <div className={styles.usermain_block_title_info}>
                                Бенгальский
                            </div>
                        </div>
                        <div className={styles.usermain_block_title}>
                            <div>
                                Телефон
                            </div>
                            <div className={styles.usermain_block_title_info}>
                                +7 937 275 64 18
                            </div>
                        </div>
                        <div className={styles.usermain_block_title}>
                            <div>
                                Email:
                            </div>
                            <div className={styles.usermain_block_title_info}>
                                vyazka@gmail.com
                            </div>
                        </div>
                        <div className={styles.usermain_block_header}>
                            Награды
                        </div>
                        <div className={styles.usermain_block_title}>
                            Призер Олимпиады
                        </div>
                        <div className={styles.usermain_block_title}>
                            Двухкратный чемпион области
                        </div>
                    </div>
                </div>

            </div>
        </Page>
    )
}

export default user;