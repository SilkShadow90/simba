import React, {ChangeEvent, useState} from "react";
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';
import {useFetchService} from "../utils/useFetchService";
import {DocsComponentInput} from "./DocsComponentInput";

type Breed = {
    id: string
    value: string
    description: string
}

export const DocsComponentVyazka:any = () => {

    const { data: breeds } = useFetchService<Breed[]>('breeds') || {}

    const [owner, setOwner] = useState<string>('')

    const [nursery, setNursery] = useState<string>('')

    const [phone, setPhone] = useState<any>('')

    const [email, setEmail] = useState<string>('')

    const [titulesMan, setTitulesMan] = useState<string>('')

    const [login, setLogin] = useState<string>('')

    const [selectTitles, setSelectTitles] = useState<any>('')

    const [color, setColor] = useState<string>('')

    const [parentsMan, setParentsMan] = useState<string>('')

    const [dateVyazka, setdateVyazka] = useState<any>('')

    const [birthsday, setBirthsday] = useState<string>('')

    const [colorLittleCat, setColorLittleCat] = useState<any>('')

    const [loginLittleCat, setLoginLittleCat] = useState<string>('')

    const [breed, setBreed] = useState<string>('')

    const [gender, setGender] = useState<string>('')

    const [juniorBreed, setJuniorBreed] = useState<string>('')



    const onSubmit = async () => {
        const form = {
            owner,
            nursery,
            phone,
            email,
            titulesMan,
            login,
            color,
            parentsMan,
            dateVyazka,
            birthsday,
            colorLittleCat,
            loginLittleCat,
            breed,
        }
        console.log(form)
    };
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setOwner(e.target.value)
    };
    const onChangeNursery = (e: ChangeEvent<HTMLInputElement>) => {
        setNursery(e.target.value)
    };
    const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    };
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };
    const onChangeTitulesMan = (e: ChangeEvent<HTMLInputElement>) => {
        setTitulesMan(e.target.value)
    };
    const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
    };
    const onChangeSelectTitles = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectTitles(e.target.value)
    };
    const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
    };
    const onChangeParentsMan = (e: ChangeEvent<HTMLInputElement>) => {
        setParentsMan(e.target.value)
    };
    const onChangeDateVyazka = (e: ChangeEvent<HTMLInputElement>) => {
        setdateVyazka(e.target.value)
    };
    const onChangeBirthsday = (e: ChangeEvent<HTMLInputElement>) => {
        setBirthsday(e.target.value)
    };
    const onChangeColorLittleCat = (e: ChangeEvent<HTMLInputElement>) => {
        setColorLittleCat(e.target.value)
    };
    const onChangeLoginLittleCat = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginLittleCat(e.target.value)
    };
    const onChangeBreed = (e: ChangeEvent<HTMLSelectElement>) => {
        setBreed(e.target.value)
    };
    const onChangeGender = (e: ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value)
    };
    const onChangeJuniorBreed = (e: ChangeEvent<HTMLSelectElement>) => {
        setJuniorBreed(e.target.value)
    };
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
                <div>
                    <div className={styles.docsRightTitul}>Информация о владельце кошки</div>
                    <DocsComponentInput text={"Владелец кошки(*)"} onChange={onChangeName} value={owner} type={"text"}/>
                    <DocsComponentInput text={"Питомник(*)"} onChange={onChangeNursery} value={nursery} type={"text"}/>
                    <DocsComponentInput text={"Телефон(*)"} onChange={onChangePhone} value={phone} type={"text"}/>
                    <DocsComponentInput text={"E-mail(*)"} onChange={onChangeEmail} value={email} type={"text"}/>
                </div>
                <div>
                    <div className={styles.docsRightTitul}>Информация о владельце кошки</div>
                    <DocsComponentInput text={"Владелец кошки(*)"} onChange={onChangeName} value={owner} type={"text"}/>
                    <DocsComponentInput text={"Питомник(*)"} onChange={onChangeNursery} value={nursery} type={"text"}/>
                    <DocsComponentInput text={"Телефон(*)"} onChange={onChangePhone} value={phone} type={"text"}/>
                    <DocsComponentInput text={"E-mail(*)"} onChange={onChangeEmail} value={email} type={"text"}/>
                </div>
            </div>
            <div className={styles.docsVstuplenieColumn}>
                <div>
                    <div className={styles.docsRightTitul}>Информация о кошке</div>
                    <DocsComponentInput text={"Титул кошки(*)"} onChange={onChangeTitulesMan} value={titulesMan} type={"text"}/>
                    <DocsComponentInput text={"Кличка кошки(*)"} onChange={onChangeLogin} value={login} type={"text"}/>
                    <div className={styles.docsPreSelect}>Порода кошки(*)</div>
                    <select className={styles.docsSelect} onChange={onChangeBreed} value={breed} name="Выберите титул" id="">
                        {breeds?.map((breed: Breed) => (
                            <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
                        ))}
                    </select>
                    <DocsComponentInput text={"Окрас(*)"} onChange={onChangeColor} value={color} type={"text"}/>
                    <DocsComponentInput text={"Родословная кошки(*)"} onChange={onChangeParentsMan} value={parentsMan} type={"file"}/>
                </div>
                <div>
                    <div className={styles.docsRightTitul}>Информация о коте</div>
                    <DocsComponentInput text={"Титул кота(*)"} type={"text"}/>
                    <DocsComponentInput text={"Кличка кота(*)"} type={"text"}/>
                    <div className={styles.docsPreSelect}>Порода кота(*)</div>
                    <select className={styles.docsSelect} name="Выберите титул" id="">
                        <option className={styles.docsOption} value="Выберите титул">Выберите породу</option>
                        {breeds?.map((breed: Breed) => (
                            <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
                        ))}
                    </select>
                    <DocsComponentInput text={"Окрас(*)"} type={"text"}/>
                    <DocsComponentInput text={"Родословная кота(*)"} type={"file"}/>
                </div>
            </div>
            <div className={styles.docsVstuplenieColumnNext}>
                <div>
                    <DocsComponentInput text={"Дата вязки"} onChange={onChangeDateVyazka} value={dateVyazka} type={"date"}/>
                </div>
                <div>
                    <DocsComponentInput text={"Дата рождения котят(*)"} onChange={onChangeBirthsday} value={birthsday} type={"date"}/>
                </div>
                <div>
                    <div className={styles.docsPreSelect}>Количество котят в помете(*)</div>
                    <select className={styles.docsSelect} name="1" id="">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="1">5</option>
                        <option value="1">6</option>
                        <option value="1">7</option>
                        <option value="1">8</option>
                        <option value="1">9</option>
                        <option value="1">10</option>
                    </select>
                </div>
            </div>
            <div className={styles.docsRightTitul}>Котята</div>
            <div className={styles.docsRightMain}>Заполните информацию о каждом котенке</div>
            <div className={styles.docsVstuplenieColumnPreNext}>
                <div>
                    <div className={styles.docsPreSelect}>Пол(*)</div>
                    <select className={styles.docsSelect}  onChange={onChangeGender} value={gender} name="Выберите пол котенка" id="">
                        <option value="Выберите пол котенка">Выберите пол котенка</option>
                        <option value="Выберите пол котенка">Кот</option>
                        <option value="Выберите пол котенка">Кошка</option>
                    </select>
                </div>
                <div>
                    <div className={styles.docsPreSelect}>Порода(*)</div>
                    <select className={styles.docsSelect}  onChange={onChangeJuniorBreed} value={juniorBreed} name="Выберите породу" id="">
                        <option className={styles.docsOption} value="Выберите титул">Выберите породу</option>
                        {breeds?.map((breed: Breed) => (
                            <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <DocsComponentInput text={"Окрас(*)"} onChange={onChangeColorLittleCat} value={colorLittleCat} type={"text"}/>
                </div>
                <div>
                    <DocsComponentInput text={"Кличка(*)"} onChange={onChangeLoginLittleCat} value={loginLittleCat} type={"text"}/>
                </div>
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
