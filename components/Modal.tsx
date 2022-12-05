import React, { ChangeEvent, PropsWithChildren, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from "../styles/Modal.module.css";
import Loader from "./Loader";
import { delay } from '../utils';

interface Props {
    active: boolean;
    onClose(): void;
}

 const Modal = ({ active, onClose }: PropsWithChildren<Props>) => {
     const [isLoading, setLoading] = useState<boolean>(false);
     const [isError, setError] = useState<boolean>(false);

     const [name, setName] = useState<string>('');

     const [phone, setPhone] = useState<any>('');

     const [email, setEmail] = useState<string>('');

     const [sms, setSMS] = useState<string>('');

     const submitIsActive: boolean = !!name;

     const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
         setName(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''));
     };

     const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
         setPhone(e.target.value?.replace(/[^0-9\s]/g, ''));
     };

     const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
         setEmail(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''));
     };

     const onChangeSms = (e: ChangeEvent<HTMLInputElement>) => {
         setSMS(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''));
     };

     useEffect(() => {
         setError(false);
     }, [name, phone, email, sms]);

     const onSubmit = async () => {
         const form = {
             name,
             phone,
             email,
             sms
         };

         console.log(form);

         try {
             setLoading(true);

             await delay(4000);
             const result = await fetch('google.com', { method: 'post', body: JSON.stringify(form) });

             if (result.ok) {
                 console.log('Все ок');
             } else {
                 throw new Error(String(result.status));
             }
             onClose();
         } catch (e) {
             setError(true);
             console.error('Что-то пошло не так: ', e);
         } finally {
             setLoading(false);
         }
     };
    return (
        <div className={classNames(styles.modal, active && styles.modal_active)} onClick={onClose}>
            <div
              className={styles.modal_content}
              onClick={(e)=>{e.stopPropagation();}}
            >
                <div className={styles.contact_Blockright}>
                    <div className={styles.contact_Blockleft__Bold}>Написать нам</div>
                    <div className={styles.modals}>
                        <input className={styles.modal_window} onChange={onChangeName} value={name} placeholder="Ваше Имя*" type="text" />
                        <input
                          className={styles.modal_window}
                          onChange={onChangePhone}
                          value={phone}
                          placeholder="Номер телефона*"
                          type="tel"
                        />
                        <input className={styles.modal_window} onChange={onChangeEmail} value={email} placeholder="Ваш Email*" type="email" />
                        <input className={styles.modal_window__sms} onChange={onChangeSms} value={sms} placeholder="Сообщения для нас" type={"text"}/>
                        <button
                          className={classNames(styles.modal_window__button, isError && styles.modal_window__button__error)}
                          disabled={!submitIsActive || isError}
                          onClick={onSubmit}
                        >
                            <Loader isVisible={isLoading} />
                            {!isLoading && 'Отправить'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
