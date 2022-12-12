import type { NextPage } from 'next';
import React from 'react';
import Image from "next/image";
import { Page } from '../components/Page';
import styles from '../styles/Partners.module.css';
import kzn from "../public/kzn.jpg";
import sponsor1 from "../public/sponsor1.jpg";
import sponsor2 from "../public/sponsor2.png";
import sponsor3 from "../public/sponsor3.png";
import sponsor4 from "../public/sponsor4.png";


const nurseries: NextPage = () => {
    return (
        <Page title="Питомники" meta="bla bla" styles={styles.container} >
            <div className={styles.partners_Main}>
                <h2>Питомники</h2>
                <h3>«Golden Pride»</h3>
                <div className={styles.partners_logo}>
                    <div className={styles.partners_logos}>
                        <Image className={styles.partners_logotype} src={kzn} objectFit={"cover"}/>
                        {/* требует доработки */}
                    </div>
                    <div className={styles.partners_info_Main}>
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
                    </div >
                </div>
                {/*<div className={styles.partners_info}>Компания «СИМБИО» представляет широкий ассортимент товаров для домашних животных, в том числе элитные корма класса холистик PureLuxe для собак и кошек, палеодиеты для кошек и собак из Канады Boreal, инновационные рулетки-поводки LIshinu,*/}
                {/*    а также повседневные и диетические корма от известных итальянских производителей Farmina Pet Foods и DiusaPet (Alleva).*/}
                {/*</div>*/}
                {/*<div className={styles.partners_info}>Наш слоган — «Технологии Жизни». Предоставляя качественные товары и сервис, мы помогаем*/}
                {/*    Вам заботиться о здоровье тех, кто Вам действительно дорог.*/}
                {/*</div>*/}
            </div>
        </Page>
    );
};

export default nurseries;