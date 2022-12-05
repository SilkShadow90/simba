
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import dayjs from "dayjs";
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';
import {useFetchService} from "../utils/useFetchService";
import {DocsComponentInput} from "./DocsComponentInput";
import { ExhibitionForm, ExhibitionFormRef } from './docs/ExhibitionForm';

type Breed = {
    id: string
    value: string
    description: string
}

type Titul = {
    id: string
    value: string
    description: string
    castration?: boolean
    kitten?: boolean
    junior?: boolean
    isHomeCat?: boolean
}

export const DocsComponentTitles:any = () => {
    const { data: breeds } = useFetchService<Breed[]>('breeds') || {};
    const { data: titlesData } = useFetchService<Titul[]>('tituls') || {};

    const [birthday, setBirthday] = useState<string>('');
    const [isAdult, setAdult] = useState<boolean>();
    const [isJunior, setJunior] = useState<boolean>();
    const [isKitten, setKitten] = useState<boolean>();
    const [isHomeCat, setHomeCat] = useState<boolean>();
    const [breed, setBreed] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [castration, setCastration] = useState<boolean>();
    const [titles, setTitles] = useState<Titul[]>([]);
    const [name, setName] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [numberDocs, setNumberDocs] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [phone, setPhone] = useState<any>('');
    const [email, setEmail] = useState<string>('');

    const [exhibitionCount, setExhibitionCount] = useState(0);

    const exhibitionFormRef = useRef<ExhibitionFormRef[]>([]);

    useEffect(() => {
        exhibitionFormRef.current.length = exhibitionCount;
    }, [exhibitionCount]);

    const onSubmit = async () => {
        const form = {
            name,
            breed,
            gender,
            birthday,
            currentTitle,
            newCurrentTitle,
            color,
            userInfo: {
                owner,
                phone,
                email
            },
            exhibitionForm: exhibitionFormRef.current?.map(value => value.getForm())
        };
        // todo remove console log
        // eslint-disable-next-line no-console
        console.log(form);
    };

    const addExhibition = () => setExhibitionCount(prevState => prevState + 1);
    const deleteExhibition = () => setExhibitionCount(prevState => prevState - 1);

    useEffect(() => {
        if (titlesData) {
            setTitles(titlesData);
        }
    }, [titlesData]);

    const [currentTitle, setCurrentTitle] = useState<string>('');
    const [newCurrentTitle, setNewCurrentTitle] = useState<string>('');

    useEffect(() => {
        switch (gender) {
            case "Кот":
            case "Кошка":
                setCastration(false);
                break;
            case "Кастрированный кот":
            case "Стерилизованная кошка":
                setCastration(true);
                break;
            default:
                setCastration(undefined);
        }
    }, [gender]);


    useEffect(()=> {
        switch (breed) {
            case "HHP":
                setHomeCat(true);
                break;
            default:
                setHomeCat(false);
        }
    },[breed]);

    useEffect(() => {
        if (birthday) {
            const currentDate = dayjs(birthday);
            const date = dayjs();

            const diff = date.diff(currentDate, 'month');

            setAdult(diff >= 10);
            setJunior(diff < 10 && diff >= 3);
            setKitten(diff < 3 && diff >= 0);
        }
    }, [birthday]);



    const filteredTitles = useMemo(() => {
        return titles.filter(title => {

            if (isHomeCat) {
                return title.isHomeCat;
            }

            const castrationCheck = (title: Titul): boolean => {
                if (castration) {
                    return !!title.castration;
                }

                return !title.castration;
            };

            const juniorCheck = (title: Titul): boolean => {
                if (isJunior) {
                    return !!title.junior;
                }

                return true;
            };

            const adultCheck = (title: Titul): boolean => {
                if (isAdult) {
                    return !title.junior && !title.kitten;
                }

                return true;
            };

            const kittenCheck = (title: Titul): boolean => {
                if (isKitten) {
                    return !!title.kitten;
                }

                return true;
            };

            return castrationCheck(title) && juniorCheck(title) && kittenCheck(title) && adultCheck(title);
        });
    }, [isJunior, isKitten, isAdult, castration, isHomeCat, titles]);


    const secondFilteredTitles = useMemo(() => {
        if (currentTitle ==='none') {
            return filteredTitles.slice(0, 1);
        }

        if (currentTitle) {
            const currentIndex: number = filteredTitles?.findIndex((title, index, array)=>{
                return currentTitle === title.value;
            });

            if (currentIndex !== -1) {
                return filteredTitles.slice(currentIndex, currentIndex + 2);
            }
        }

        return [];
    },[currentTitle, filteredTitles]);

    console.log("secondFilteredTitles",secondFilteredTitles);

    useEffect(() => {
        if (filteredTitles) {
            setCurrentTitle(filteredTitles?.[0]?.value || '');
        }
    }, [isAdult, isJunior, isKitten, castration, filteredTitles]);

    console.log('filteredTitles', filteredTitles);

    const onChangeBreed = (e: ChangeEvent<HTMLSelectElement>) => {
        setBreed(e.target.value);
    };

    const onChangeTitles = (e: ChangeEvent<HTMLSelectElement>) => {
        setCurrentTitle(e.target.value);
    };

    const onChangeBirthday = (e: ChangeEvent<HTMLInputElement >) => {
        setBirthday(e.target.value);
    };

    const onChangeGender = (e: ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    };

    const onChangeNewTitules = (e: ChangeEvent<HTMLSelectElement>) => {
        setNewCurrentTitle(e.target.value);
    };

    const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };
    const onChangeNumberDocs = (e: ChangeEvent<HTMLInputElement>) => {
        setNumberDocs(e.target.value);
    };
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setOwner(e.target.value);
    };
    const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>{Strings.titulStart.titulHeader.title}</div>
            <div className={styles.docsRightMain}>{Strings.titulStart.titulHeader.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulHeader.info}
            </div>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulHeader.postInfo}
            </div>
            <button className={styles.docsButton}>Скачать заявление на титул</button>

            <div className={styles.docsRightTitul}>{Strings.titulStart.titulMain.title}</div>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulMain.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulMain.info}
            </div>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulMain.postInfo}
            </div>

            <DocsComponentInput text={"Кличка животного(*)"} onChange={onChangeLogin} value={name} type={"text"}/>
            {/* <DocsComponentInput text={} type={} onChange={} value={}/> */}
            <div className={styles.docsPreSelect}>Порода кошки(*)</div>
            <select className={styles.docsSelect} onChange={onChangeBreed} value={breed} name="Выберите породу" id="">
                <option className={styles.docsOption} value="Выберите породу">Выберите породу</option>
                {breeds?.map((breed: Breed) => (
                    <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
                ))}
            </select>

            <div className={styles.docsPreSelect}>Пол(*)</div>
            <select className={styles.docsSelect} onChange={onChangeGender} value={gender} name="Выберите пол" id="">
                <option className={styles.docsOption}  value="Выберите пол">Выберите пол</option>
                <option className={styles.docsOption} value="Кот" > Кот</option>
                <option className={styles.docsOption} value="Кошка"> Кошка</option>
                <option className={styles.docsOption} value="Кастрированный кот"> Кастрированный кот</option>
                <option className={styles.docsOption} value="Стерилизованная кошка"> Стерилизованная кошка</option>
            </select>

            <div className={styles.docsPreSelect}>Дата рождения(*)</div>
            <input className={styles.docsSelect} onChange={onChangeBirthday} value={birthday} type="date"/>

            <div className={styles.docsPreSelect}>Последний полученный титул</div>
            <select className={styles.docsSelect} onChange={onChangeTitles} value={currentTitle} name="Выберите титул" id="">
                <option className={styles.docsOption}  value="Выберите титул">Выберите титул</option>
                <option className={styles.docsOption}  value="none">Без титула</option>
                {filteredTitles?.map((titul: Titul) => (
                    <option key={titul.id} className={styles.docsOption} value={titul.value}>{titul.description}</option>
                ))}
            </select>
            <div className={styles.docsPreSelect}>Запрашиваемый титул(*)</div>
            <select className={styles.docsSelect} onChange={onChangeNewTitules} value={newCurrentTitle} name="Выберите титул" id="">
                <option className={styles.docsOption} value="Выберите титул">Выберите титул</option>
                {secondFilteredTitles?.map((titul: Titul) => (
                    <option key={titul.id} className={styles.docsOption} value={titul.value}>{titul.description}</option>
                ))}
            </select>

            <DocsComponentInput text={"Окрас"} onChange={onChangeColor} value={color} type={"text"}/>

            <DocsComponentInput text={"Номер родословной(*)"} onChange={onChangeNumberDocs} value={numberDocs} type={"text"}/>

            <div className={styles.docsRightTitul}>Информация о владельце</div>
            <div className={styles.docsRightInputs}>
                <div className={styles.docsRightInputsColumns}>
                    <DocsComponentInput text={"Владелец(*)"} onChange={onChangeName} value={owner} type={"text"}/>
                </div>
                <div className={styles.docsRightInputsColumns}>
                    <DocsComponentInput text={"Телефон(*)"} onChange={onChangePhone} value={phone} type={"text"}/>
                </div>
                <div className={styles.docsRightInputsColumns}>
                    <DocsComponentInput text={"E-mail(*)"} onChange={onChangeEmail} value={email} type={"text"}/>
                </div>
            </div>

            <div className={styles.docsRightTitul}>
                <span style={{ paddingRight: '16px' }}>Оценки получены на следующих выставках</span>
                {!!exhibitionCount && (
                    <button className={styles.docsButton} onClick={deleteExhibition}>Удалить последний</button>
                )}
            </div>
            <div className={styles.docsRightInputs}>
                {!!exhibitionCount && new Array(exhibitionCount).fill('Выставка').map((title, index) => (
                  <ExhibitionForm
                    key={`${title} ${index + 1}`}
                    title={`${title} ${index + 1}`}
                    ref={ref => {
                          if (exhibitionFormRef.current && ref) {
                              exhibitionFormRef.current[index] = ref;
                          }
                      }}
                  />
                ))}
                {exhibitionCount <= 2 && (
                    <button className={styles.docsButton} onClick={addExhibition}>Добавить</button>
                )}
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input type="checkbox"/>
                <div>Даю согласие на обработку персональных данных
                    (публикация ФИО и контактной информации в родословных, сертификатах, в каталогах выставок и т.д.)
                </div>
            </div>
            <button className={styles.docsButton} onClick={onSubmit}>Отправить</button>
        </div>
    );
};
