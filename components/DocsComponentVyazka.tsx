import React, { ChangeEvent, Ref, useRef, useState } from 'react';
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';
import {useFetchService} from "../utils/useFetchService";
import {DocsComponentInput} from "./DocsComponentInput";
import { CatInformationForm, CatInformationFormRef } from './docs/CatInformationForm';

type Breed = {
    id: string
    value: string
    description: string
}

export const DocsComponentVyazka:any = () => {

    const { data: breeds } = useFetchService<Breed[]>('breeds') || {}

    const [dateVyazka, setdateVyazka] = useState<any>('')
    const [birthsday, setBirthsday] = useState<string>('')
    const [colorLittleCat, setColorLittleCat] = useState<any>('')
    const [loginLittleCat, setLoginLittleCat] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [juniorBreed, setJuniorBreed] = useState<string>('')

    const catInformationFormFatherRef = useRef<CatInformationFormRef>()
    const catInformationFormMotherRef = useRef<CatInformationFormRef>()

    const onSubmit = async () => {
        const form = {
            dateVyazka,
            birthsday,
            colorLittleCat,
            loginLittleCat,
            father: catInformationFormFatherRef.current?.getForm() || {},
            mother: catInformationFormMotherRef.current?.getForm() || {},
        }
        console.log(form)
    };

    const onChangeInput = (func: (text: string) => void) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        func(e.target.value)
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
            <button className={styles.docsButton}>Скачать направление на вязку</button>
            <div className={styles.docsRightTitul}>{Strings.vyazka.vyazkaMain.title}</div>
            <div className={styles.docsRightMain}>{Strings.vyazka.vyazkaMain.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.vyazka.vyazkaMain.info}</div>
            <div className={styles.docsRightEnd}>{Strings.vyazka.vyazkaMain.postInfo}</div>
            <div className={styles.docsVstuplenieColumn}>
                <CatInformationForm breeds={breeds} gender={1} ref={catInformationFormFatherRef as Ref<CatInformationFormRef>}/>
                <CatInformationForm breeds={breeds} gender={0} ref={catInformationFormMotherRef as Ref<CatInformationFormRef>}/>
            </div>
            <div className={styles.docsVstuplenieColumnNext}>
                <div>
                    <DocsComponentInput text={"Дата вязки"} onChange={onChangeInput(setdateVyazka)} value={dateVyazka} type={"date"}/>
                </div>
                <div>
                    <DocsComponentInput text={"Дата рождения котят(*)"} onChange={onChangeInput(setBirthsday)} value={birthsday} type={"date"}/>
                </div>
                <div>
                    <div className={styles.docsPreSelect}>Количество котят в помете(*)</div>
                    <select className={styles.docsSelect} name="1" id="">
                        {new Array(10).fill(null).map((_, index) => (
                          <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.docsRightTitul}>Котята</div>
            <div className={styles.docsRightMain}>Заполните информацию о каждом котенке</div>
            <div className={styles.docsVstuplenieColumnPreNext}>
                <div>
                    <div className={styles.docsPreSelect}>Пол(*)</div>
                    <select className={styles.docsSelect}  onChange={onChangeInput(setGender)} value={gender} name="Выберите пол котенка" id="">
                        <option value="Выберите пол котенка">Выберите пол котенка</option>
                        <option value="1">Кот</option>
                        <option value="0">Кошка</option>
                    </select>
                </div>
                <div>
                    <div className={styles.docsPreSelect}>Порода(*)</div>
                    <select className={styles.docsSelect}  onChange={onChangeInput(setJuniorBreed)} value={juniorBreed} name="Выберите породу" id="">
                        <option className={styles.docsOption} value="Выберите титул">Выберите породу</option>
                        {breeds?.map((breed: Breed) => (
                            <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
                        ))}
                    </select>
                </div>
                <DocsComponentInput useContainer text={"Окрас(*)"} onChange={onChangeInput(setColorLittleCat)} value={colorLittleCat} type={"text"}/>
                <DocsComponentInput useContainer text={"Кличка(*)"} onChange={onChangeInput(setLoginLittleCat)} value={loginLittleCat} type={"text"}/>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input type="checkbox"/>
                <div>Даю согласие на обработку персональных данных
                    (публикация ФИО и контактной информации в родословных, сертификатах, в каталогах выставок и т.д.)
                </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input type="checkbox"/>
                <div>
                    С Правилами племенной работы ознакомлен.
                </div>
            </div>
            <button className={styles.docsButton} onClick={onSubmit}>Отправить</button>
        </div>
    )
};
