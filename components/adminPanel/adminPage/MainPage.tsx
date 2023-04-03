import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from '../../../styles/adminStyles/AdminMainPage.module.css';
import { InputArea } from '../InputArea';
import { Strings } from '../../../resources';
import { AdminButton } from '../AdminButton';

export const MainPage = () => {
  const [name, setName] = useState<string>('');

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    console.log(name);
  }, [name]);

  const onSubmit = () => {
    console.log(name);
  };

  return (
    <div className={styles.openMain}>
      <div className={styles.openMainWindow}>
        <div className={styles.title}>Главная</div>
        <InputArea placeholderColor={'black'} placeholder={'Главная'}/>
        <div className={styles.info}>
          <input
            className={styles.columnBlock} value={name} onChange={onChangeName} placeholder={Strings.main.text[0]}
            type="text"/>
        </div>
        <AdminButton type={'secondary'} onClick={onSubmit} text={'Отправить'}/>
      </div>
    </div>
  );
};
