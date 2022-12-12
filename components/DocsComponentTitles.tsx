
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import dayjs from "dayjs";
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';
import {useFetchService} from "../utils/useFetchService";
import {DocsComponentInput} from "./DocsComponentInput";
import { onChangeInput } from "../utils";
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

    return (
        <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>{Strings.titulStart.titulHeader.title}</div>
            <div className={styles.docsRightMain}>{Strings.titulStart.titulHeader.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulHeader.info}</div>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulHeader.postInfo}</div>
            <button className={styles.docsButton}>{Strings.titulStart.titulHeader.button}</button>

            <div className={styles.docsRightTitul}>{Strings.titulStart.titulMain.title}</div>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulMain.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulMain.info}
            </div>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulMain.postInfo}
            </div>

            <DocsComponentInput text={Strings.CatInformationForm.other.nameAminal} onChange={onChangeInput(setName)} value={name} type={"text"}/>
            <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.breed}</div>
            <select className={styles.docsSelect} onChange={onChangeInput(setBreed)} value={breed} name={Strings.CatInformationForm.other.selectBreed} id="">
                <option className={styles.docsOption} value={Strings.CatInformationForm.other.selectBreed}>{Strings.CatInformationForm.other.selectBreed}</option>
                {breeds?.map((breed: Breed) => (
                    <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
                ))}
            </select>

            <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.gender}</div>
            <select className={styles.docsSelect} onChange={onChangeInput(setGender)} value={gender} name={Strings.CatInformationForm.other.selectGender} id="">
                <option className={styles.docsOption} value={Strings.CatInformationForm.other.selectGender}>{Strings.CatInformationForm.other.selectGender}</option>
                <option className={styles.docsOption} value={Strings.titulStart.titulMain.other.catMan} > {Strings.titulStart.titulMain.other.catMan}</option>
                <option className={styles.docsOption} value={Strings.titulStart.titulMain.other.catGirl}> {Strings.titulStart.titulMain.other.catGirl}</option>
                <option className={styles.docsOption} value={Strings.titulStart.titulMain.other.catManHalf}>  {Strings.titulStart.titulMain.other.catManHalf}</option>
                <option className={styles.docsOption} value={Strings.titulStart.titulMain.other.catGirlHalf}> {Strings.titulStart.titulMain.other.catGirlHalf}</option>
            </select>

            <div className={styles.docsPreSelect}>{Strings.titulStart.titulMain.other.birthsday}</div>
            <input className={styles.docsSelect} onChange={onChangeInput(setBirthday)} value={birthday} type="date"/>

            <div className={styles.docsPreSelect}>{Strings.titulStart.titulMain.other.lastTitle}</div>
            <select className={styles.docsSelect} onChange={onChangeInput(setCurrentTitle)} value={currentTitle} name={Strings.CatInformationForm.other.selectTitle} id="">
                <option className={styles.docsOption}  value={Strings.CatInformationForm.other.selectTitle}>{Strings.CatInformationForm.other.selectTitle}</option>
                <option className={styles.docsOption}  value="none">{Strings.CatInformationForm.other.noneTitle}</option>
                {filteredTitles?.map((titul: Titul) => (
                    <option key={titul.id} className={styles.docsOption} value={titul.value}>{titul.description}</option>
                ))}
            </select>
            <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.nextTitle}</div>
            <select className={styles.docsSelect} onChange={onChangeInput(setNewCurrentTitle)} value={newCurrentTitle} name={Strings.CatInformationForm.other.selectTitle} id="">
                <option className={styles.docsOption} value={Strings.CatInformationForm.other.selectTitle}>{Strings.CatInformationForm.other.selectTitle}</option>
                {secondFilteredTitles?.map((titul: Titul) => (
                    <option key={titul.id} className={styles.docsOption} value={titul.value}>{titul.description}</option>
                ))}
            </select>

            <DocsComponentInput text={Strings.CatInformationForm.other.colorStock} onChange={onChangeInput(setColor)} value={color} type={"text"}/>

            <DocsComponentInput text={Strings.CatInformationForm.other.numberParents} onChange={onChangeInput(setNumberDocs)} value={numberDocs} type={"text"}/>

            <div className={styles.docsRightTitul}>{Strings.CatInformationForm.other.infoParents}</div>
            <div className={styles.docsRightInputs}>
                <div className={styles.docsRightInputsColumns}>
                    <DocsComponentInput text={Strings.CatInformationForm.other.owner} onChange={onChangeInput(setOwner)} value={owner} type={"text"}/>
                </div>
                <div className={styles.docsRightInputsColumns}>
                    <DocsComponentInput text={Strings.CatInformationForm.other.phone} onChange={onChangeInput(setPhone)} value={phone} type={"text"}/>
                </div>
                <div className={styles.docsRightInputsColumns}>
                    <DocsComponentInput text={Strings.CatInformationForm.other.email} onChange={onChangeInput(setEmail)} value={email} type={"text"}/>
                </div>
            </div>

            <div className={styles.docsRightTitul}>
                <span style={{ paddingRight: '16px' }}>{Strings.titulStart.titulEnd.title}</span>
                {!!exhibitionCount && (
                    <button className={styles.docsButton} onClick={deleteExhibition}>{Strings.titulStart.titulEnd.postTitle}</button>
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
                    <button className={styles.docsButton} onClick={addExhibition}>{Strings.titulStart.titulEnd.text}</button>
                )}
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input type="checkbox"/>
                <div>{Strings.titulStart.titulEnd.postText}
                </div>
            </div>
            <button className={styles.docsButton} onClick={onSubmit}>{Strings.titulStart.titulEnd.button}</button>
        </div>
    );
};
