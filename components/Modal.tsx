import styles from "../styles/Modal.module.css";
import React, {PropsWithChildren} from "react";

interface Props {
    active: boolean;
    setActive: any;
}

 const Modal = ({active, setActive}: PropsWithChildren<Props>) => {
    return (
        <div className={active ? styles.modal_active : styles.modal} onClick={()=>{setActive(false)}}>
            <div className={styles.modal_content} onClick={(e)=>{e.stopPropagation()}}>
                <div className={styles.contact_Blockright}>
                    <div className={styles.contact_Blockleft__Bold}>Написать нам</div>
                    <div className={styles.modals}>
                        <input className={styles.modal_window}   placeholder="Ваше Имя*" type="text" />
                        <input className={styles.modal_window}   placeholder="Номер телефона*" type="tel" />
                        <input className={styles.modal_window}   placeholder="Ваш Email*" type="email" />
                        <input className={styles.modal_window__sms}  placeholder="Сообщения для нас" type={"text"}/>
                        <button className={styles.modal_window__button}  >Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;