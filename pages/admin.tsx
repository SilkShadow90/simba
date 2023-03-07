import type { NextPage } from 'next';
import React, {ChangeEvent, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/adminStyles/Admin.module.css';
import { Page } from '../components/Page';
import { AdminTab } from '../components/adminPanel/AdminTab';
import {AdminButton} from "../components/adminPanel/AdminButton";
import {Strings} from "../resources";
import {useFetchService} from "../utils/useFetchService";
import {Cats} from "./api/cats";
import Loader from "../components/Loader";
import dashboard from "../public/adminImg/menu/dashboard.svg";
import dashboardActive from "../public/adminImg/menu/dashboard-active.svg";
import tasks from "../public/adminImg/menu/tasks.svg";
import tasksActive from "../public/adminImg/menu/tasks-active.svg";
import deals from "../public/adminImg/menu/deals.svg";
import dealsActive from "../public/adminImg/menu/deals-active.svg";
import {AdminInputTab} from "../components/adminPanel/AdminInputTab";
import Image from "next/image";
import ExhibitionCard from "../components/Intro/ExhibitionCard";
import {Nurser} from "./api/nurser/[id]";
import {Exhibition} from "./api/allExhibition";
import {Text} from "../components/adminPanel/Text"

const Admin: NextPage = () => {

  const adminState = useSelector((state: any) => state.adminState);
    const [name, setName] = useState<string>('');
    const [toggle,setToggle] = useState<boolean>(false);
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
        useEffect(()=>{
            console.log(name)},[name])


    const onSubmit = () => {
        console.log(name)
    }

    const { data: catsData } = useFetchService<Cats[]>('cats') || {};
    const { data: nurseriesData } = useFetchService<Nurser[]>('nurseries') || {};
    const { data: exhibitionData } = useFetchService<Exhibition[]>('allExhibition') || {};

    if (!catsData || !nurseriesData || !exhibitionData) {
        return (
            <Loader isVisible={true} />
        );
    }
    console.log(catsData)
    console.log(nurseriesData)
    console.log(exhibitionData)


  const renderSecondElement = () => {

    switch (Object.entries(adminState).find(([_, value]) => value)?.[0]) {
      case 'openedMain':
        return (
          <div className={styles.openMain}>
              <div className={styles.openMainWindow}>
                  <div className={styles.title}>Главная</div>
                  <div className={styles.info}>
                      <input className={styles.columnBlock} value={name} onChange={onChangeName} placeholder={Strings.main.text[0]} type="text"/>
                  </div>
                  <Text size={60} color={"pink"} text={"asdasdasdads"}/>
                  <AdminButton type={"secondary"} onClick={onSubmit} text={"Отправить"}/>
              </div>
          </div>
        );
      case 'openedCats':
        return (
            <>
                <div className={styles.openCatsFiltered}>
                    <div className={styles.openCatsFiltered_left}>
                        <div>Filter</div>
                        {/*<Text size={15} text={"Company"}/>*/}
                        <select className={styles.openCatsFiltered_left_select} name="all" id="1">
                            <option value="1">all</option>
                        </select>
                    </div>
                    <AdminButton type={"primary"} onClick={onSubmit} text={"Add Contact"}/>
                </div>
                <div className={styles.openMainStart}>
                      {!!catsData && catsData.map((cats) => (
                          <AdminInputTab
                              name={cats.name}
                              email={cats.club}
                              info={cats.breed}
                              checked={cats.favorite}
                              infotwo={"sadas"}
                              procent={50}
                              date={1}
                          />
                      ))}
                </div>
            </>
        );
      case 'openedDocs':
        return (
          <div className={styles.openMain}>
              <div >
                  фильтр из 5 вариантов каждого документа и тысячи инпутов
              </div>
          </div>
        );
      case 'openedShows':
        return (
            <>
                <div className={styles.openCatsFiltered}>
                    <div className={styles.openCatsFiltered_left}>
                        <div>Filter</div>
                        {/*<Text size={15} text={"Company"}/>*/}
                        <select className={styles.openCatsFiltered_left_select} name="all" id="1">
                            <option value="1">all</option>
                        </select>
                    </div>
                    <AdminButton type={"primary"} onClick={onSubmit} text={"Add Contact"}/>
                </div>
                <div className={styles.openMainStart}>
                    {!!exhibitionData && exhibitionData.map((exhibition) => (
                        <AdminInputTab
                            name={exhibition.dateStart}
                            email={exhibition.dateEnd}
                            info={exhibition.club || ""}
                            infotwo={exhibition.type || ""}
                            procent={50}
                            date={1}
                        />
                    ))}
                </div>
            </>
        );
        case 'openedClubs':
        return (
            <>
                    <div className={styles.openCatsFiltered}>
                        <div className={styles.openCatsFiltered_left}>
                            <div>Filter</div>
                            {/*<Text size={15} text={"Company"}/>*/}
                            <select className={styles.openCatsFiltered_left_select} name="all" id="1">
                                <option value="1">all</option>
                            </select>
                        </div>
                        <AdminButton type={"primary"} onClick={onSubmit} text={"Add Contact"}/>
                    </div>
                   <div className={styles.openMainStart}>
                       {!!nurseriesData && nurseriesData.map((nurseries) => (
                           <AdminInputTab
                               name={nurseries.worked}
                               email={nurseries.email}
                               info={nurseries.name}
                               infotwo={nurseries.phone}
                               procent={50}
                               date={1}
                           />
                       ))}
                  </div>
            </>
        );
      case 'openedContacts':
        return (
           <div className={styles.openMain}>
              <div >
                    редактирования информации на вкладке контакты
              </div>
          </div>
        );
    }

    return null;
  };


   const a = () => setToggle((prevstate)=>!prevstate)
    return (
      <Page title="Панель Администратора" meta="bla bla" styles={styles.container} withoutHeaderAndFooter>
          <div className={styles.adminCards}>
              <div className={!toggle ?  styles.adminCardsLeft : styles.adminCardsLeftToogleOn}>
                  <div className={styles.adminCardsLeft_input}>
                          <AdminTab short={toggle} srcActive={dashboardActive} srcNoActive={dashboard} text={"Главная"} type='openedMain' />
                          <AdminTab short={toggle} srcActive={tasksActive} srcNoActive={tasks} text={"Кошки"} type='openedCats' />
                          <AdminTab short={toggle} srcActive={dealsActive} srcNoActive={deals} text={"Документы"} type='openedDocs' />
                          <AdminTab short={toggle} srcActive={dashboardActive} srcNoActive={dashboard} text={"Выставки"} type='openedShows' />
                          <AdminTab short={toggle} srcActive={tasksActive} srcNoActive={tasks} text={"Питомники"} type='openedClubs' />
                      {
                          toggle
                              ? <button style={{background:"inherit",border:"none",position:"fixed",bottom:"26px"}} onClick={a}>
                                  <Image  className={styles.adminCardsLeft_input_position_img} objectFit={"cover"}  src={dashboard} />
                                </button>
                              :  <button className={styles.adminCardsLeftToogleText} onClick={a}>Toggle sidebar</button>
                      }
                  </div>
              </div>
              <div className={styles.adminCardsRightt}>
                  {renderSecondElement()}
              </div>
          </div>
      </Page>
  );
};

export default Admin;
