import React, { ChangeEvent, Ref, useRef, useState } from 'react';
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';
import {useFetchService} from "../utils/useFetchService";
import {DocsComponentInput} from "./DocsComponentInput";
import { CatInformationForm, CatInformationFormRef } from './docs/CatInformationForm';
import DictionaryMethods from '../api/DictionaryMethods';

type Breed = {
    id: string
    value: string
    description: string
}

export const DocsComponentVyazka:any = () => {
    const { data: breeds } = useFetchService<Breed[]>(DictionaryMethods.getBreeds) || {};

    const [dateVyazka, setdateVyazka] = useState<any>('');
    const [birthsday, setBirthsday] = useState<string>('');
    const [colorLittleCat, setColorLittleCat] = useState<any>('');
    const [loginLittleCat, setLoginLittleCat] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [juniorBreed, setJuniorBreed] = useState<string>('');

    const catInformationFormFatherRef = useRef<CatInformationFormRef>();
    const catInformationFormMotherRef = useRef<CatInformationFormRef>();

    const onSubmit = async () => {
        const form = {
            dateVyazka,
            birthsday,
            colorLittleCat,
            loginLittleCat,
            father: catInformationFormFatherRef.current?.getForm() || {},
            mother: catInformationFormMotherRef.current?.getForm() || {},
        };
        console.log(form);
    };

    const onChangeInput = (func: (text: string) => void) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        func(e.target.value);
    };

    if (!breeds?.length) {
      return null;
    }

    return (
        <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>{Strings.vyazka.vyazkaHeader.title}</div>
            <div className={styles.docsRightMain}>{Strings.vyazka.vyazkaHeader.postTitle}</div>
            <div className={styles.docsRightEnd}> {Strings.vyazka.vyazkaHeader.info}
            </div>
            <div className={styles.docsRightEnd}> {Strings.vyazka.vyazkaHeader.postInfo}</div>
            <div className={styles.docsRightEnd}> {Strings.vyazka.vyazkaHeader.text}
            </div>
            <button className={styles.docsButton}>{Strings.vyazka.vyazkaHeader.button}</button>
            <div className={styles.docsRightTitul}>{Strings.vyazka.vyazkaMain.title}</div>
            <div className={styles.docsRightMain}>{Strings.vyazka.vyazkaMain.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.vyazka.vyazkaMain.info}</div>
            <div className={styles.docsRightEnd}>{Strings.vyazka.vyazkaMain.postInfo}</div>
            <div className={styles.docsVstuplenieColumn}>
                <CatInformationForm breeds={breeds} gender={1} ref={catInformationFormFatherRef as Ref<CatInformationFormRef>}/>
                <CatInformationForm breeds={breeds} gender={0} ref={catInformationFormMotherRef as Ref<CatInformationFormRef>}/>
            </div>
            <div className={styles.docsVstuplenieColumnNext}>
                <DocsComponentInput
                  useContainer
                  text={Strings.vyazka.vyazkaMain.dataVyazka}
                  onChange={onChangeInput(setdateVyazka)}
                  value={dateVyazka}
                  type="date"
                />
                <DocsComponentInput
                  useContainer
                  text={Strings.vyazka.vyazkaMain.dateBirthsdayJunior}
                  onChange={onChangeInput(setBirthsday)}
                  value={birthsday}
                  type="date"
                />
                <div>
                    <div className={styles.docsPreSelect}>{Strings.vyazka.vyazkaMain.anyJunior}</div>
                    <select className={styles.docsSelect} name="1" id="">
                        {new Array(10).fill(null).map((_, index) => (
                          <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.docsRightTitul}>{Strings.vyazka.vyazkaMain.juniorCats}</div>
            <div className={styles.docsRightMain}>{Strings.vyazka.vyazkaMain.infoJuniorCats}</div>
            <div className={styles.docsVstuplenieColumnPreNext}>
                <div>
                    <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.gender}</div>
                    <select
                      className={styles.docsSelect}
                      onChange={onChangeInput(setGender)}
                      value={gender}
                      name={Strings.vyazka.vyazkaMain.selectGenderJunior}
                    >
                        <option value={Strings.vyazka.vyazkaMain.selectGenderJunior}>{Strings.vyazka.vyazkaMain.selectGenderJunior}</option>
                        <option value="1">{Strings.titulStart.titulMain.other.catMan}</option>
                        <option value="0">{Strings.titulStart.titulMain.other.catGirl}</option>
                    </select>
                </div>
                <div>
                    <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.miniBreed}</div>
                    <select
                      className={styles.docsSelect}
                      onChange={onChangeInput(setJuniorBreed)}
                      value={juniorBreed}
                      name={Strings.CatInformationForm.other.selectBreed}
                    >
                        <option
                          className={styles.docsOption}
                          value={Strings.CatInformationForm.other.selectTitle}
                        >{Strings.CatInformationForm.other.selectTitle}</option>
                        {breeds?.map((breed: Breed) => (
                            <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
                        ))}
                    </select>
                </div>
                <DocsComponentInput useContainer text={Strings.CatInformationForm.other.color} onChange={onChangeInput(setColorLittleCat)} value={colorLittleCat} type={"text"}/>
                <DocsComponentInput useContainer text={Strings.CatInformationForm.other.miniNameAnimal} onChange={onChangeInput(setLoginLittleCat)} value={loginLittleCat} type={"text"}/>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input type="checkbox"/>
                <div>{Strings.vyazka.vyazkaMain.button.title}
                </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input type="checkbox"/>
                <div>
                   {Strings.vyazka.vyazkaMain.button.text}
                </div>
            </div>
            <button className={styles.docsButton} onClick={onSubmit}>{Strings.vyazka.vyazkaMain.button.button}</button>
        </div>
    );
};
