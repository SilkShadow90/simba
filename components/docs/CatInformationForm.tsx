import React, { ChangeEvent, Ref, useImperativeHandle, useState } from 'react';
import styles from '../../styles/Docs.module.css';
import { DocsComponentInput } from '../DocsComponentInput';

type Breed = {
  id: string
  value: string
  description: string
}

type Props = {
  gender: number;
  breeds?: Breed[];
}

export type CatInformationFormRef = {
  getForm(): {
    owner: string;
    nursery: string;
    phone: string;
    email: string;
    titulesMan: string;
    login: string;
    color: string;
    parentsMan: string;
    breed: string;
  }
}

const RenderCatInformationForm = ({ gender, breeds }: Props, ref: Ref<CatInformationFormRef>): React.ReactElement => {
  const [owner, setOwner] = useState<string>('')
  const [nursery, setNursery] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [titulesMan, setTitulesMan] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [parentsMan, setParentsMan] = useState<string>('')
  const [breed, setBreed] = useState<string>('')

  useImperativeHandle(ref, () => ({
    getForm: () => {
      return {
        owner,
        nursery,
        phone,
        email,
        titulesMan,
        login,
        color,
        parentsMan,
        breed,
      }
    }
  }));

  const onChangeInput = (func: (text: string) => void) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    func(e.target.value)
  }

  return (
    <div>
      <div className={styles.docsRightTitul}>{gender ? 'Информация о владельце кота' : 'Информация о владельце кошки'}</div>
      <DocsComponentInput text={gender ? 'Владелец кота(*)' : 'Владелец кошки(*)'} onChange={onChangeInput(setOwner)} value={owner} type={"text"}/>
      <DocsComponentInput text={"Питомник(*)"} onChange={onChangeInput(setNursery)} value={nursery} type={"text"}/>
      <DocsComponentInput text={"Телефон(*)"} onChange={onChangeInput(setPhone)} value={phone} type={"text"}/>
      <DocsComponentInput text={"E-mail(*)"} onChange={onChangeInput(setEmail)} value={email} type={"text"}/>

      <div>
        <div className={styles.docsRightTitul}>{gender ? 'Информация о коте' : 'Информация о кошке'}</div>
        <DocsComponentInput text={gender ? "Титул кота(*)" : 'Титул кошки(*)'} onChange={onChangeInput(setTitulesMan)} value={titulesMan} type={"text"}/>
        <DocsComponentInput text={gender ? "Кличка кота(*)" : 'Кличка кошки(*)'} onChange={onChangeInput(setLogin)} value={login} type={"text"}/>
        <div className={styles.docsPreSelect}>Порода кошки(*)</div>
        <select className={styles.docsSelect} onChange={onChangeInput(setBreed)} value={breed} name="Выберите титул" id="">
          {breeds?.map((breed: Breed) => (
            <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
          ))}
        </select>
        <DocsComponentInput text={"Окрас(*)"} onChange={onChangeInput(setColor)} value={color} type={"text"}/>
        <DocsComponentInput text={gender ? "Родословная кота(*)" : 'Родословная кошки(*)'} onChange={onChangeInput(setParentsMan)} value={parentsMan} type={"file"}/>
      </div>
    </div>
  )
}

export const CatInformationForm = React.memo(React.forwardRef(RenderCatInformationForm))
