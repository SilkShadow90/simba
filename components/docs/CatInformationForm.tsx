import React, { ChangeEvent, Ref, useImperativeHandle, useState } from 'react';
import styles from '../../styles/docs/CatInformation.module.css';
import { DocsComponentInput } from '../DocsComponentInput';
import { Strings } from '../../resources';
import {onChangeInput} from "../../utils/Func";

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


  return (
    <div>
      <div className={styles.Titul}>{gender ? Strings.CatInformationForm.manCat.infoParents : Strings.CatInformationForm.girlCat.infoParents}</div>
      <DocsComponentInput text={gender ? Strings.CatInformationForm.manCat.owner : Strings.CatInformationForm.girlCat.owner} onChange={onChangeInput(setOwner)} value={owner} type={"text"}/>
      <DocsComponentInput text={Strings.CatInformationForm.other.exhibition} onChange={onChangeInput(setNursery)} value={nursery} type={"text"}/>
      <DocsComponentInput text={Strings.CatInformationForm.other.phone} onChange={onChangeInput(setPhone)} value={phone} type={"text"}/>
      <DocsComponentInput text={Strings.CatInformationForm.other.email} onChange={onChangeInput(setEmail)} value={email} type={"text"}/>

      <div>
        <div className={styles.Titul}>{gender ? Strings.CatInformationForm.manCat.indoCat : Strings.CatInformationForm.girlCat.indoCat}</div>
        <DocsComponentInput text={gender ? Strings.CatInformationForm.manCat.titules : Strings.CatInformationForm.girlCat.titules} onChange={onChangeInput(setTitulesMan)} value={titulesMan} type={"text"}/>
        <DocsComponentInput text={gender ? Strings.CatInformationForm.manCat.login : Strings.CatInformationForm.girlCat.login} onChange={onChangeInput(setLogin)} value={login} type={"text"}/>
        <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.breed}</div>
        <select className={styles.Select} onChange={onChangeInput(setBreed)} value={breed} name="Выберите титул" id="">
          {breeds?.map((breed: Breed) => (
            <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
          ))}
        </select>
        <DocsComponentInput text={Strings.CatInformationForm.other.color} onChange={onChangeInput(setColor)} value={color} type={"text"}/>
        <DocsComponentInput text={gender ? Strings.CatInformationForm.manCat.pedigree : Strings.CatInformationForm.girlCat.pedigree} onChange={onChangeInput(setParentsMan)} value={parentsMan} type={"file"}/>
      </div>
    </div>
  )
}

export const CatInformationForm = React.memo(React.forwardRef(RenderCatInformationForm))
