import type { NextPage } from 'next'
import styles from '../styles/Contacts.module.css'
import React, { ChangeEvent, useState } from 'react';
import { Page } from '../components/Page';


const сontacts: NextPage = () => {

    let value = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    };

    const [name, setName] = useState<string>('')

    const submitIsActive: boolean = !!name

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''))
    };

    const onSubmit = async () => {
        console.log({ name });
        const data = { name }
        try {
            const result = await fetch('google.com', { method: 'post', body: JSON.stringify(data) })

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
        <Page title="сontacts" meta="bla bla" styles={styles.container} >
            <div className={styles.contact}>
                <div className={styles.contact_Blockleft}>
                    <div className={styles.contact_Blockleft__Bold}>Контакты</div>
                    <div className={styles.contact_Blockleft__Registered}>РФОО Коргоруши зарегистрирован в WCF с 1995 г. под номером RU-0135</div>
                    <div className={styles.contact_Blockleft__Email}>www.korgorushi.com</div>
                    <div className={styles.contact_Blockleft__Email}>www.korgorushi.com</div>
                    <div className={styles.contact_Blockleft__Email}>club@korgorushi.com</div>
                    <div className={styles.contact_Blockleft__Bold}>Москвичев Роман Алексеевич</div>
                    <div>8-960-365-53-37</div>
                </div>
                <div className={styles.contact_Blockright}>
                    <div className={styles.contact_Blockleft__Bold}>Написать нам</div>
                    <div className={styles.modal}>
                        <input className={styles.modal_window} onChange={onChangeName} value={name} placeholder="Ваше Имя*" type="text" />
                        <input className={styles.modal_window} placeholder="Номер телефона*" type="tel" />
                        <input className={styles.modal_window} placeholder="Ваш Email*" type="email" />
                        <input className={styles.modal_window__sms} onChange={value} placeholder="Сообщения для нас" type={"text"}/>
                        <button className={styles.modal_window__button} disabled={!submitIsActive} onClick={onSubmit}>Отправить</button>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default сontacts
