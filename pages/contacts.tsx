import type { NextPage } from 'next';
import React, { ChangeEvent, useState } from 'react';
import styles from '../styles/Contacts.module.css';
import { Page } from '../components/Page';
import { Grid } from '../components/UIKit/Grid';
import { ScreenLayout } from '../components/UIKit/ScreenLayout';
import { GridItem } from '../components/UIKit/GridItem';
import { TextBlock } from '../components/UIKit/TextBlock';
import { useFetchService } from '../utils/useFetchService';
import InfoMethods from '../api/InfoMethods';
import { Flex } from '../components/UIKit/Flex';


const Contacts: NextPage = () => {
  const { data: info, loading } = useFetchService(InfoMethods.getData);

  // let value = (e: ChangeEvent<HTMLInputElement>) => {
  //     console.log(e.target.value)
  // };

  const [name, setName] = useState<string>('');

  const [phone, setPhone] = useState<any>('');

  const [email, setEmail] = useState<string>('');

  const [sms, setSMS] = useState<string>('');

  // const [name, setName] = useState<string>('')

  const submitIsActive: boolean = !!name;

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''));
  };

  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''));
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''));
  };

  const onChangeSms = (e: ChangeEvent<HTMLInputElement>) => {
    setSMS(e.target.value?.replace(/[^a-zA-Zа-яА-Я\s]/g, ''));
  };

  const onSubmit = async () => {
    const form = {
      name,
      phone,
      email,
      sms,
    };

    console.log(form);

    try {
      const result = await fetch('google.com', { method: 'post', body: JSON.stringify(form) });

      if (result.ok) {
        console.log('Все ок');
      } else {
        throw new Error(String(result.status));
      }
    } catch (e) {
      console.error('Что-то пошло не так: ', e);
    }
  };

  return (
    <Page title="сontacts" meta="bla bla" isLoading={loading}>
      <ScreenLayout>
        <TextBlock type="H1">
          {'Контакты'}
        </TextBlock>
        <Grid gridTemplateColumns="repeat(3, 1fr)">
          <GridItem styleProps={styles.contact_Blockleft}>
            {!!info && (
              <Flex flexDirection="column" padding="0">
                <TextBlock type="Body">
                  {'Основные данные: '}
                </TextBlock>
                <TextBlock type="Body">
                  {info.contacts.name}
                </TextBlock>
                {!!info.contacts.tel?.length && (
                  <>
                    <TextBlock type="Small">
                      {'телефон: '}
                    </TextBlock>
                    {info.contacts.tel.map((tl) => (
                      <TextBlock type="Link" key={tl}>
                        {tl}
                      </TextBlock>
                    ))}
                  </>
                )}
                {!!info.contacts.email && (
                  <>
                    <TextBlock type="Small">
                      {'почта: '}
                    </TextBlock>
                    <TextBlock type="Link">
                      {info.contacts.email}
                    </TextBlock>
                  </>
                )}
                <TextBlock type="Small">
                  {'председатель:'}
                </TextBlock>
                <TextBlock type="Body">
                  {info.contacts.person}
                </TextBlock>
              </Flex>
            )}
          </GridItem>
          <GridItem>
            <div className={styles.contact_Blockleft__Bold}>Написать нам</div>
            <div className={styles.modals}>
              <input className={styles.modal_window} onChange={onChangeName} value={name} placeholder="Ваше Имя*"
                     type="text"/>
              <input className={styles.modal_window} onChange={onChangePhone} value={phone}
                     placeholder="Номер телефона*" type="tel"/>
              <input className={styles.modal_window} onChange={onChangeEmail} value={email} placeholder="Ваш Email*"
                     type="email"/>
              <input className={styles.modal_window__sms} onChange={onChangeSms} value={sms}
                     placeholder="Сообщения для нас" type={'text'}/>
              <button className={styles.modal_window__button} disabled={!submitIsActive} onClick={onSubmit}>Отправить
              </button>
            </div>
          </GridItem>
        </Grid>
      </ScreenLayout>
    </Page>
  );
};

export default Contacts;
