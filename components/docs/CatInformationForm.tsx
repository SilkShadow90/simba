import React, {Ref, useImperativeHandle, useMemo, useState} from 'react';
import styles from '../../styles/docs/CatInformation.module.css';
import { DocsComponentInput } from '../DocsComponentInput';
import { Strings } from '../../resources';
import { onChangeInput } from "../../utils";
import { Breed } from '../../api/types';
import {AdminMyCustomSelectHOC} from "../adminPanel/AdminMyCustomSelect";
import {Field} from "redux-form";

type Props = {
  gender?: number;
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
  const [owner, setOwner] = useState<string>('');
  const [nursery, setNursery] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [titulesMan, setTitulesMan] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [parentsMan, setParentsMan] = useState<string>('');
  const [currentBreed, setCurrentBreed] = useState<string>('');

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
        breed: currentBreed,
      };
    }
  }));


  const breedSelectHOC = useMemo(() => AdminMyCustomSelectHOC({
      name:"breed",
      options:[
        {value:Strings.CatInformationForm.other.selectBreed, label:Strings.CatInformationForm.other.selectBreed},
      ].concat(breeds?.map((breed: Breed) => (
        {value:breed.code,label:`${breed.name} (${breed.code})`})) || [])}),
    [breeds]);

  return (
    <div>
      <div className={styles.Titul}>{gender ? Strings.CatInformationForm.manCat.infoParents : Strings.CatInformationForm.girlCat.infoParents}</div>
      <DocsComponentInput text={gender ? Strings.CatInformationForm.manCat.owner : Strings.CatInformationForm.girlCat.owner} name={"owner"} type={"text"}/>
      <DocsComponentInput text={Strings.CatInformationForm.other.exhibition} name={"exhibition"} type={"text"}/>
      <DocsComponentInput text={Strings.CatInformationForm.other.phone} name={"phone"} type={"text"}/>
      <DocsComponentInput text={Strings.CatInformationForm.other.email} name={"email"} type={"text"}/>
      <div>
        <div className={styles.Titul}>{gender ? Strings.CatInformationForm.manCat.indoCat : Strings.CatInformationForm.girlCat.indoCat}</div>
        <DocsComponentInput text={gender ? Strings.CatInformationForm.manCat.titules : Strings.CatInformationForm.girlCat.titules} name={"titules"}  type={"text"}/>
        <DocsComponentInput text={gender ? Strings.CatInformationForm.manCat.login : Strings.CatInformationForm.girlCat.login} name={"login"}  type={"text"}/>
        <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.breed}</div>
        <Field
          name={"breed"}
          component={breedSelectHOC}
        />
        <DocsComponentInput text={Strings.CatInformationForm.other.color} name={"color"}  type="text" />
      </div>
    </div>
  );
};

export const CatInformationForm = React.memo(React.forwardRef(RenderCatInformationForm));


export const Catman = () => {
  return (
  <div>
    <div className={styles.Titul}>{Strings.CatInformationForm.manCat.infoParents}</div>
    <DocsComponentInput text={Strings.CatInformationForm.manCat.owner} name={"owner"} type={"text"}/>
    <DocsComponentInput text={Strings.CatInformationForm.other.exhibition} name={"exhibition"} type={"text"}/>
    <DocsComponentInput text={Strings.CatInformationForm.other.phone} name={"phone"} type={"text"}/>
    <DocsComponentInput text={Strings.CatInformationForm.other.email} name={"email"} type={"text"}/>
  </div>
  )
}

export const Infocatman = ({breeds}:Props, ref: Ref<CatInformationFormRef>) => {
  const breedSelectHOC = useMemo(() => AdminMyCustomSelectHOC({
      name:"breed",
      options:[
        {value:Strings.CatInformationForm.other.selectBreed, label:Strings.CatInformationForm.other.selectBreed},
      ].concat(breeds?.map((breed: Breed) => (
        {value:breed.code,label:`${breed.name} (${breed.code})`})) || [])}),
    [breeds]);
  return (
  <div>
    <div className={styles.Titul}>{Strings.CatInformationForm.manCat.indoCat}</div>
    <DocsComponentInput text={Strings.CatInformationForm.manCat.titules} name={"titules"}  type={"text"}/>
    <DocsComponentInput text={Strings.CatInformationForm.manCat.login} name={"login"}  type={"text"}/>
    <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.breed}</div>
    <Field
      name={"breed"}
      component={breedSelectHOC}
    />
    <DocsComponentInput text={Strings.CatInformationForm.other.color} name={"color"}  type="text" />
  </div>

  )
}
export const Catgirl = () => {
  return (
  <div>
    <div className={styles.Titul}>{Strings.CatInformationForm.girlCat.infoParents}</div>
    <div className={styles.checked}>
      <input type="checkbox"/>
      <div className={styles.checked_text}>Совпадает с владельцем кота</div>
    </div>

    <DocsComponentInput text={Strings.CatInformationForm.girlCat.owner} name={"owner"} type={"text"}/>
    <DocsComponentInput text={Strings.CatInformationForm.other.exhibition} name={"exhibition"} type={"text"}/>
    <DocsComponentInput text={Strings.CatInformationForm.other.phone} name={"phone"} type={"text"}/>
    <DocsComponentInput text={Strings.CatInformationForm.other.email} name={"email"} type={"text"}/>
  </div>
  )
}

export const Infocatgirl = ({breeds}:Props, ref: Ref<CatInformationFormRef>) => {
  const breedSelectHOC = useMemo(() => AdminMyCustomSelectHOC({
      name:"breed",
      options:[
        {value:Strings.CatInformationForm.other.selectBreed, label:Strings.CatInformationForm.other.selectBreed},
      ].concat(breeds?.map((breed: Breed) => (
        {value:breed.code,label:`${breed.name} (${breed.code})`})) || [])}),
    [breeds]);
  return(
  <div>
  <div className={styles.Titul}>{Strings.CatInformationForm.girlCat.indoCat}</div>
  <DocsComponentInput text={Strings.CatInformationForm.girlCat.titules} name={"titules"}  type={"text"}/>
  <DocsComponentInput text={Strings.CatInformationForm.girlCat.login} name={"login"}  type={"text"}/>
  <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.breed}</div>
  <Field
    name={"breed"}
    component={breedSelectHOC}
  />
  <DocsComponentInput text={Strings.CatInformationForm.other.color} name={"color"}  type="text" />
</div>
  )
}
