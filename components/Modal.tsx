import React, { ChangeEvent, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from "../styles/Modal.module.css";
import Loader from "./Loader";
import { useFetchService } from '../utils/useFetchService';
import FeedbackMethods from '../api/FeedbackMethods';
import { Feedback } from '../api/types';

interface Props {
    active: boolean;
    onClose(): void;
}

 const Modal = ({ active, onClose }: PropsWithChildren<Props>) => {
     const [isError, setError] = useState<boolean>(false);

     const errorCallback = useCallback(() => {
         setError(true);
     }, []);

     const { fetchData, loading = false } = useFetchService<void, Feedback>({
         methodFunc: FeedbackMethods.createFeedback,
         pending: true,
         successCallback: onClose,
         errorCallback,
     });

     const [name, setName] = useState<string>('');
     const [phone, setPhone] = useState<string>('');
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
         await fetchData({
             name,
             phone,
             email,
             text: sms
         });
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
                            <Loader isVisible={loading} />
                            {!loading && 'Отправить'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
