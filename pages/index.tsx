import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import React from "react";
import { Strings } from '../resources';
import Image from "next/image";
import {Page} from "../components/Page";
import kits from "../public/kits.png";
import show from "../public/show.png";
import {Join} from "../components/Joined";

const Home: NextPage = () => {
  return (
      <Page title="Home" meta="bla bla" styles={styles.container}>
          <div className={styles.titleList}>
              Слайдер
          </div>
          <div className={styles.infoUpper}>{Strings.main.title}</div>
          <div className={styles.info}>
              <div className={styles.infoOver}>
                  <div className={styles.column}>
                      {Strings.main.text.map(text => (
                          <div key={text} className={styles.leftColumnText}>
                              {text}
                          </div>
                      ))}
                  </div>
                  <div className={styles.column}>
                          <div className={styles.rightColumnText}>
                              {Strings.main.textRight}
                          </div>
                          <div className={styles.rightColumnText}>
                              {Strings.main.textRightOne}
                          </div>
                          <div className={styles.rightColumnText}>

                              {Strings.main.textRightTwo}
                          </div>
                          <div className={styles.rightColumnText}>
                              {Strings.main.textRightTree}
                          </div>
                          <div className={styles.rightColumnText}>
                              {Strings.main.textRightThour}
                          </div>
                          <div className={styles.rightColumnText}>
                              {Strings.main.textRightFive}
                          </div>
                          <div className={styles.rightColumnText}>
                              {Strings.main.textRightSix}
                          </div>
                          <div className={styles.rightColumnText}>
                              {Strings.main.textRightSeven}
                          </div>
                  </div>
              </div>
              <div className={styles.razdel}>
                  <div className={styles.razdelRow}>
                      <div className={styles.razdelCardleft}></div>
                      <div className={styles.razdelCardleft}></div>
                  </div>
                  <div className={styles.razdelColumn}>
                      <div className={styles.razdelCardRight}>
                          {/*<Image className={styles.art}  sizes={"1"} src={cat}/>*/}
                      </div>
                      <div className={styles.razdelCardRight}>
                          {/*<Image  src={simba}/>*/}
                          {/*<img src={simba} alt="s"/>*/}
                      </div>
                  </div>
              </div>
              <div className={styles.razdelDown}>

                  {/*Сделать отдельный компонент(вынести стринги(доделать верстку(разобраться почему не делится в гридах(сделать в гридах))))*/}
                  <div className={styles.razdelDownMain}>Чем занимается клуб Симба</div>
                  <div className={styles.razdelDownBlock}>
                      <div>
                          <Image src={show}/>
                      </div>
                      <div className={styles.razdelDownBlockText}>
                          <div>Выставки кошек</div>
                          <span>Клуб проводит яркие и запоминающиеся выставки кошек по системе WCF.</span>
                      </div>
                  </div>
                  <div className={styles.razdelDownBlock}>
                      <div>
                          <Image src={kits}/>
                      </div>
                      <div className={styles.razdelDownBlockText}>
                          <div>Регистрация пометов</div>
                          <span>Регистрация пометов Клуб регистрирует факт рождения котят и выдает документы о происхождении на каждого из них.</span>
                      </div>
                  </div>
              </div>
              <div className={styles.razdelCenter}>
                  {/*Вынести в стринги (возможно в отдельный компонент (доделать оформление))*/}
                  <div className={styles.razdelCenterBlockLeft}>
                      <div className={styles.razdelCenterBlockTextMain}>У меня появился породистый кот</div>
                      <div>Если у вас появился породистая кошка или кот, наверняка у вас уже накопилось много вопросов:</div>
                      <li>Как вступить в клуб?</li>
                      <li>Нужно ли посещать выставку кошек?</li>
                      <li>Как оформить титульный сертификат на кота или кошку?</li>
                      <li>Как найти партнера коту или кошке?</li>
                      <li>Как зарегистрировать котят в клубе?</li>
                      <li>И многие другие...</li>
                      <div>Часть ответов вы найдете на нашем сайте, по остальным вопросам пишите-звоните нам!</div>
                  </div>
                  <div className={styles.razdelCenterBlockRight}>
                      <div className={styles.razdelCenterBlockTextMain}>Я решил купить породистого котенка</div>
                      <div>Покупка породистого котенка - дело ответственное!</div>
                      <li>Где можно купить породистого котенка?</li>
                      <li>Какие документы должны быть у котенка?</li>
                      <li>Бывают ли породистые котята без документов?</li>
                      <li>В каком возрасте можно покупать котят?</li>
                      <li>Как проверить надежность питомника?</li>
                      <li>И многие другие...</li>
                      <div>Часть ответов вы найдете на нашем сайте, по остальным вопросам пишите-звоните нам!</div>
                  </div>
              </div>
              <Join/>
          </div>
    </Page>
  )
}

export default Home
