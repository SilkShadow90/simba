import React, {useState} from "react";
import styles from "../../styles/adminStyles/AdminList.module.css";
import {AdminTab} from "./AdminTab";
import dashboardActive from "../../public/adminImg/menu/dashboard-active.svg";
import dashboard from "../../public/adminImg/menu/dashboard.svg";
import tasksActive from "../../public/adminImg/menu/tasks-active.svg";
import tasks from "../../public/adminImg/menu/tasks.svg";
import dealsActive from "../../public/adminImg/menu/deals-active.svg";
import deals from "../../public/adminImg/menu/deals.svg";
import subtractActive from "../../public/adminImg/menu/Subtract-active.svg";
import subtract from "../../public/adminImg/menu/Subtract.svg";
import Image from "next/image";
import classNames from "classnames";


export const AdminList = () => {
    const [toggle,setToggle] = useState<boolean>(false);
    const a = () => setToggle((prevstate)=>!prevstate)
    return (
        <div className={!toggle ?  styles.adminCardsLeft : styles.adminCardsLeftToogleOn}>
            <div className={styles.adminCardsLeft_input}>
                <AdminTab
                    short={toggle}
                    srcActive={dashboardActive}
                    srcNoActive={dashboard}
                    text={"Главная"}
                    type='openedMain'
                />
                <AdminTab
                    short={toggle}
                    srcActive={tasksActive}
                    srcNoActive={tasks}
                    text={"Кошки"}
                    type='openedCats'
                />
                <AdminTab
                    short={toggle}
                    srcActive={dealsActive}
                    srcNoActive={deals}
                    text={"Документы"}
                    type='openedDocs'
                />
                <AdminTab
                    short={toggle}
                    srcActive={dashboardActive}
                    srcNoActive={dashboard}
                    text={"Выставки"}
                    type='openedShows'
                />
                <AdminTab
                    short={toggle}
                    srcActive={tasksActive}
                    srcNoActive={tasks}
                    text={"Питомники"}
                    type='openedClubs'
                />
                {
                    toggle ? (
                        <button
                            style={{background: "inherit", border: "none", position: "fixed", bottom: "26px",cursor:"pointer"}}
                            onClick={a}
                        >
                            <Image
                                className={styles.adminCardsLeft_input_position_img}
                                objectFit={"cover"}
                                src={subtractActive}
                            />
                        </button>
                    ) : (
                        <button onClick={a} className={styles.adminCardsLeftToogleText}>
                            <Image
                                className={styles.adminCardsLeft_input_position_toggle_img}
                                objectFit={"cover"}
                                src={subtract}
                            />
                            <div className={classNames(styles.adminCardsLeftToogleText,styles.adminCardsLeftToogleText_margin)} >Toggle sidebar</div>
                        </button>
                    )
                }
            </div>
        </div>
    );
};