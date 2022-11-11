import type { NextPage } from 'next'
import React from 'react';
import { Page } from '../components/Page';
import styles from '../styles/Partners.module.css';
import Image from "next/image";
import logos from "../public/logos.jpg";
import sponsor1 from "../public/sponsor1.jpg";
import sponsor2 from "../public/sponsor2.png";
import sponsor3 from "../public/sponsor3.png";
import sponsor4 from "../public/sponsor4.png";


const partners: NextPage = () => {
    return (
        <Page title="Партнеры" meta="bla bla" styles={styles.container} >
            <div className={styles.partners_Main}>
                <h2>Наши партнеры</h2>
                <h3>Группа компаний Симбио</h3>
                <div className={styles.partners_logo}>
                    <div className={styles.partners_logos}>
                        <Image className={styles.partners_logotype} src={logos} objectFit={"cover"}/>
                        {/*требует доработки*/}
                    </div>
                    <div className={styles.partners_info_Main}>
                        <div className={styles.partners_info}>Журавлева Кристина Игоревна / Kristina Zhuravleva </div>
                        <div className={styles.partners_info}>Менеджер по работе с заводчиками / Breeder Service Manager</div>
                        <div className={styles.partners_info}>SIMBIO LLC</div>
                        <div className={styles.partners_info}>www.simbio.ru</div>
                        <div className={styles.partners_info}>Группа компаний «СИМБИО» более 15 лет занимается реализацией кормов, ветеринарных
                            препаратов, кормовых добавок, ферментов, продуктов для дезинфекции, диагностических наборов и
                            оборудования, как среди производителей сельскохозяйственной продукции, так и владельцев собак
                            и кошек, ветеринарных клиник, профессиональных заводчиков и зоомагазинов.
                        </div>
                    </div >
                </div>
                <div className={styles.partners_info}>Компания «СИМБИО» представляет широкий ассортимент товаров для домашних животных, в том числе элитные корма класса холистик PureLuxe для собак и кошек, палеодиеты для кошек и собак из Канады Boreal, инновационные рулетки-поводки LIshinu,
                        а также повседневные и диетические корма от известных итальянских производителей Farmina Pet Foods и DiusaPet (Alleva).
                </div>
                <div className={styles.partners_info}>Наш слоган — «Технологии Жизни». Предоставляя качественные товары и сервис, мы помогаем
                    Вам заботиться о здоровье тех, кто Вам действительно дорог.
                </div>
                <div className={styles.partners_logo}>
                    <div className={styles.partners_padding}>
                        <Image src={sponsor1} objectFit={"cover"}/>
                    </div>
                   <div className={styles.partners_padding}>
                       <Image src={sponsor2} objectFit={"cover"}/>
                   </div>
                </div>
                <div className={styles.partners_logo}>
                    <div className={styles.partners_padding}>
                        <Image src={sponsor3} objectFit={"cover"}/>
                    </div>
                    <div className={styles.partners_padding}>
                        <Image src={sponsor4} objectFit={"cover"}/>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default partners;