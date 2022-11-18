import styles from "../styles/Modal.module.css";
import React, {ChangeEvent, PropsWithChildren, useState} from "react";
import classNames from 'classnames';
import Loader from "./Loader";

interface Props {
    active: boolean;
    onClose(): void;
}

 const Modal = ({ active, onClose }: PropsWithChildren<Props>) => {

     const [name, setName] = useState<string>('')

     const [phone, setPhone] = useState<any>('')

     const [email, setEmail] = useState<string>('')

     const [sms, setSMS] = useState<string>('')

     const submitIsActive: boolean = !!name

     const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
         setName(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''))
     };

     const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
         setPhone(e.target.value?.replace(/[^[0-9]\s]/g, ''))
     };

     const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
         setEmail(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''))
     };

     const onChangeSms = (e: ChangeEvent<HTMLInputElement>) => {
         setSMS(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''))
     };
     const onSubmit = async () => {
         const form = {
             name,
             phone,
             email,
             sms
         }

         console.log(form)

         try {
             const result = await fetch('google.com', { method: 'post', body: JSON.stringify(form) })

             if (result.ok) {
                 console.log('Все ок');
             } else {
                 throw new Error(String(result.status))
             }
         } catch (e) {
             console.error('Что-то пошло не так: ', e);
         }
     }
    return (
        <div className={classNames(styles.modal, active && styles.modal_active)} onClick={onClose}>
            <div className={styles.modal_content} onClick={(e)=>{e.stopPropagation()}}>
                <div className={styles.contact_Blockright}>
                    <div className={styles.contact_Blockleft__Bold}>Написать нам</div>
                    <div className={styles.modals}>
                        <input className={styles.modal_window} onChange={onChangeName} value={name} placeholder="Ваше Имя*" type="text" />
                        <input className={styles.modal_window} onChange={onChangePhone} value={phone} placeholder="Номер телефона*" type="tel" />
                        <input className={styles.modal_window} onChange={onChangeEmail} value={email} placeholder="Ваш Email*" type="email" />
                        <input className={styles.modal_window__sms} onChange={onChangeSms} value={sms} placeholder="Сообщения для нас" type={"text"}/>
                        <button className={styles.modal_window__button} disabled={!submitIsActive}  onClick={onSubmit
                          // onClose()
                        } >
                            {/*<Loader/>*/}
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
