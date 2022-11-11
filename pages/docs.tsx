import type { NextPage } from 'next';
import styles from '../styles/Docs.module.css';
import React, { ChangeEvent, ChangeEventHandler, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Page } from '../components/Page';
import { DocsPanel } from '../components/DocsPanel';
import { useSelector } from 'react-redux';
import { Strings } from '../resources';
import { ApiResponse, fetcher, getBackEndUrl } from '../utils';

import useSWR from 'swr'
import dayjs from 'dayjs';
import { useFetchService } from '../utils/useFetchService';

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



const Docs: NextPage = () => {
  const docsState = useSelector((state: any) => state.docsState);

  const { data: breeds } = useFetchService<Breed[]>('breeds') || {}
  const { data: titlesData } = useFetchService<Titul[]>('tituls') || {}

  const [birthday, setBirthday] = useState<string>('')
  const [isAdult, setAdult] = useState<boolean>()
  const [isJunior, setJunior] = useState<boolean>()
  const [isKitten, setKitten] = useState<boolean>()
  const [isHomeCat, setHomeCat] = useState<boolean>()
  const [breed, setBreed] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [castration, setCastration] = useState<boolean>()
  const [titles, setTitles] = useState<Titul[]>([])



  useEffect(() => {
    if (titlesData) {
      setTitles(titlesData)
    }
  }, [titlesData])

  const [newTitles, setNewTitles] = useState<Titul[]>([])
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [newCurrentTitle, setNewCurrentTitle] = useState<string>('')




  useEffect(() => {
    switch (gender) {
      case "Кот":
      case "Кошка":
        console.log("Ты выбрал кота или кошку");
        setCastration(false)
        break;
      case "Кастрированный кот":
      case "Стерилизованная кошка":
        console.log("Ты выбрал Кастрированный кот");
        setCastration(true)
        break;
      default:
        console.log("Не правильно")
        setCastration(undefined)
    }
  }, [gender])


    useEffect(()=> {
        switch (breed) {
            case "HHP":
                setHomeCat(true);
                console.log("ты выбрал домашняя ")
                break;
        }
    },[breed])

  useEffect(() => {
    if (birthday) {
      console.count('birthday')
      const currentDate = dayjs(birthday)
      const date = dayjs()

      const diff = date.diff(currentDate, 'month')

      const isAdult = diff >= 10
      const isJunior = diff < 10 && diff >= 3
      const isKitten = diff < 3 && diff >= 0

      setAdult(isAdult)
      setJunior(isJunior)
      setKitten(isKitten)
    }
  }, [birthday])



  const filteredTitles = useMemo(() => {
    return titles.filter(title => {

        if (isHomeCat) {
            return title.isHomeCat
        }

      const castrationCheck = (title: Titul): boolean => {
        if (castration) {
          return !!title.castration
        }

        return !title.castration
      }

      const juniorCheck = (title: Titul): boolean => {
        if (isJunior) {
          return !!title.junior
        }

        return true
      }

      const adultCheck = (title: Titul): boolean => {
        if (isAdult) {
          return !title.junior && !title.kitten
        }

        return true
      }

      const kittenCheck = (title: Titul): boolean => {
        if (isKitten) {
          return !!title.kitten
        }

        return true
      }

      return castrationCheck(title) && juniorCheck(title) && kittenCheck(title) && adultCheck(title)
    })
  }, [isJunior, isKitten, isAdult, castration, isHomeCat, titles])


    const secondFilteredTitles = useMemo(() => {
      if (currentTitle ==='none') {
        return filteredTitles.slice(0, 1)
      }

      if (currentTitle) {
        const currentIndex: number = filteredTitles?.findIndex((title, index, array)=>{
            return currentTitle === title.value
        })

        if (currentIndex !== -1) {
          return filteredTitles.slice(currentIndex, currentIndex + 2)
        }

        // return filteredTitles?.reduce((acc: Titul[], title, index, array): Titul[] => {
        //   if (currentTitle === title.value) {
        //     if (array[index + 1].value) {
        //       return [
        //         title,
        //         array[index + 1],
        //       ]
        //     }
        //
        //     return [
        //       title,
        //     ]
        //   }
        //
        //   return acc
        // }, [])
      }

      return []
    },[currentTitle, filteredTitles])

    console.log("secondFilteredTitles",secondFilteredTitles)

  useEffect(() => {
    if (filteredTitles) {
      setCurrentTitle(filteredTitles?.[0]?.value || '')
    }
  }, [isAdult, isJunior, isKitten, castration, filteredTitles])

  console.log('filteredTitles', filteredTitles);


  const onChangeBreed = (e: ChangeEvent<HTMLSelectElement>) => {
      setBreed(e.target.value)
  }

  const onChangeTitles = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentTitle(e.target.value)
  }

  const onChangeBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value)
  }

  const onChangeGender = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value)
  }

  const onChangeNewTitules = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewCurrentTitle(e.target.value)
  }

  const renderSecondElement = () => {
    switch (Object.entries(docsState).find(([_, value]) => value)?.[0]) {
      case 'openedvstuplenie':
        return (
          <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>{Strings.docsStart.title}</div>
            <div className={styles.docsRightMain}>{Strings.docsStart.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.docsStart.info}</div>
            <ul className={styles.docsRightUL}>
                {Strings.docsStart.li.map(text => (
                    <li key={text} className={styles.docsLi}>
                        {text}
                    </li>
                ))}
            </ul>
            <button className={styles.docsButton}>Скачать заявление на вступление в клуб</button>
          </div>
        );
      case 'openedtitul':

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
            <div className={styles.docsPreSelect}>Кличка животного(*)</div>
            <input className={styles.docsSelect} type="text"/>

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

            <div className={styles.docsPreSelect}>Окрас</div>
            <input className={styles.docsSelect} onChange={e => console.log(e.target.value)} type="text"/>

            <div className={styles.docsPreSelect}>Номер родословной(*)</div>
            <input className={styles.docsSelect} type="text"/>

            <div className={styles.docsRightTitul}>Информация о владельце</div>
            <div className={styles.docsRightInputs}>
              <div className={styles.docsRightInputsColumns}>
                <div className={styles.docsPreSelect}>Владелец(*)</div>
                <input className={styles.docsSelect} type="text"/>
              </div>
              <div className={styles.docsRightInputsColumns}>
                <div className={styles.docsPreSelect}>Телефон(*)</div>
                <input className={styles.docsSelect} type="text"/>
              </div>
              <div className={styles.docsRightInputsColumns}>
                <div className={styles.docsPreSelect}>E-mail(*)</div>
                <input className={styles.docsSelect} type="text"/>
              </div>
            </div>

            <div className={styles.docsRightTitul}>Оценки получены на следующих выставках</div>
            <div className={styles.docsRightInputs}>
              <div className={styles.docsRightInputsColumns}>
                <div className={styles.docsRightTitul}>Выставка 1</div>
                <div className={styles.docsPreSelect}>Дата выставки(*)</div>
                <input className={styles.docsSelect} type="date"/>
                <div className={styles.docsPreSelect}>Место проведения(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Номер лицензии(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Клуб(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Эксперт(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Оценка, титул(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Оценочный лист, диплом(*)</div>
                <input className={styles.docsSelect} type="file"/>
              </div>
              <div className={styles.docsRightInputsColumns}>
                <div className={styles.docsRightTitul}>Выставка 2</div>
                <div className={styles.docsPreSelect}>Дата выставки(*)</div>
                <input className={styles.docsSelect} type="date"/>
                <div className={styles.docsPreSelect}>Место проведения(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Номер лицензии(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Клуб(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Эксперт(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Оценка, титул(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Оценочный лист, диплом(*)</div>
                <input className={styles.docsSelect} type="file"/>
              </div>
              <div className={styles.docsRightInputsColumns}>
                <div className={styles.docsRightTitul}>Выставка 3</div>
                <div className={styles.docsPreSelect}>Дата выставки(*)</div>
                <input className={styles.docsSelect} type="date"/>
                <div className={styles.docsPreSelect}>Место проведения(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Номер лицензии(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Клуб(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Эксперт(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Оценка, титул(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Оценочный лист, диплом(*)</div>
                <input className={styles.docsSelect} type="file"/>
              </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
              <input type="checkbox"/>
              <div>Даю согласие на обработку персональных данных
                (публикация ФИО и контактной информации в родословных, сертификатах, в каталогах выставок и т.д.)
              </div>
            </div>
            <button className={styles.docsButton}>Отправить</button>
          </div>
        );
      case 'openedregister':
        return (
          <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>{Strings.register.registerHeader.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.info}
            </div>
            <ul className={styles.docsRightUL}>
                {Strings.register.registerHeader.infoLi.map(text => (
                    <li key={text} className={styles.rightColumnText}>
                        {text}
                    </li>
                ))}
            </ul>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.postInfo}
            </div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.main}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.postMain}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.text}
            </div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.postText}
            </div>
            <button className={styles.docsButton}>Скачать заявление на регистрацию питомника</button>

            <div className={styles.docsRightTitul}>{Strings.register.registerMain.title}</div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.one.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.one.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.two.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.two.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.three.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.three.text}</div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.four.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.four.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.five.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.five.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.six.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.six.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.seven.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.seven.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.eight.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.eight.text}
            </div>
            <div className={styles.docsRightEnd}>Префикс и суффикс считаются длиной всего имени кошки.</div>
          </div>
        );
      case 'openedvyazka':
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
                <div className={styles.docsPreSelect}>Владелец кошки(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Питомник(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Телефон(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>E-mail(*)</div>
                <input className={styles.docsSelect} type="text"/>
              </div>
              <div>
                <div className={styles.docsRightTitul}>Информация о владельце кошки</div>
                <div className={styles.docsPreSelect}>Владелец кота(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Питомник</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Телефон</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>E-mail</div>
                <input className={styles.docsSelect} type="text"/>
              </div>
            </div>
            <div className={styles.docsVstuplenieColumn}>
              <div>
                <div className={styles.docsRightTitul}>Информация о кошке</div>
                <div className={styles.docsPreSelect}>Титул кошки(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Кличка кошки(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Порода кошки(*)</div>
                <select className={styles.docsSelect} name="Выберите титул" id="">
                  <option className={styles.docsOption} value="Выберите титул">Выберите породу</option>
                    {breeds?.map((breed: Breed) => (
                        <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
                    ))}
                </select>
                <div className={styles.docsPreSelect}>Окрас(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Родословная кошки(*)</div>
                <input className={styles.docsSelect} type="file"/>
              </div>
              <div>
                <div className={styles.docsRightTitul}>Информация о коте</div>
                <div className={styles.docsPreSelect}>Титул кота(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Кличка кота(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Порода кота(*)</div>
                <select className={styles.docsSelect} name="Выберите титул" id="">
                  <option className={styles.docsOption} value="Выберите титул">Выберите породу</option>
                    {breeds?.map((breed: Breed) => (
                        <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
                    ))}
                </select>
                <div className={styles.docsPreSelect}>Окрас(*)</div>
                <input className={styles.docsSelect} type="text"/>
                <div className={styles.docsPreSelect}>Родословная кота(*)</div>
                <input className={styles.docsSelect} type="file"/>
              </div>
            </div>
            <div className={styles.docsVstuplenieColumnNext}>
              <div>
                <div className={styles.docsPreSelect}>Дата вязки</div>
                <input className={styles.docsSelect} type="date"/>
              </div>
              <div>
                <div className={styles.docsPreSelect}>Дата рождения котят(*)</div>
                <input className={styles.docsSelect} type="date"/>
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
                <select className={styles.docsSelect} name="Выберите пол котенка" id="">
                  <option value="Выберите пол котенка">Выберите пол котенка</option>
                  <option value="Выберите пол котенка">Кот</option>
                  <option value="Выберите пол котенка">Кошка</option>
                </select>
              </div>
              <div>
                <div className={styles.docsPreSelect}>Порода(*)</div>
                <select className={styles.docsSelect} name="Выберите породу" id="">
                  <option className={styles.docsOption} value="Выберите титул">Выберите породу</option>
                    {breeds?.map((breed: Breed) => (
                        <option key={breed.id} className={styles.docsOption} value={breed.value}>{breed.description}</option>
                    ))}
                </select>
              </div>
              <div>
                <div className={styles.docsPreSelect}>Окрас(*)</div>
                <input className={styles.docsSelect} type="text"/>
              </div>
              <div>
                <div className={styles.docsPreSelect}>Кличка(*)</div>
                <input className={styles.docsSelect} type="text"/>
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
            <button className={styles.docsButton}>Отправить</button>
          </div>
        );
      case 'openedposition':
        return (
          <>
            11111
          </>
        );
    }

    return null;
  };

  return (
    <Page title="Docs" meta="bla bla" styles={styles.container}>
      <div className={styles.docsCards}>
        <div className={styles.docsCardsLeft}>
          <DocsPanel text={'Вступление в клуб'} type="openedvstuplenie"/>
          <DocsPanel text={'Заявление на титул'} type="openedtitul"/>
          <DocsPanel text={'Регистрация питомника'} type="openedregister"/>
          <DocsPanel text={'Заявление на вязку'} type="openedvyazka"/>
          <DocsPanel text={'Племенное положение'} type="openedposition"/>
        </div>
        <div className={styles.docsCardsRight}>
          {renderSecondElement()}
        </div>
      </div>
    </Page>
  );
};

// This function gets called at build time
// export async function getServerSideProps() {
//   try {
//
//     console.warn('qweqwewqe');
//     const response = await fetch('/api/breeds');
//
//     const { data }: ApiResponse<Breed[]> = await response.json() || {};
//
//     if (data) {
//       return {
//         props: {
//           breeds: data,
//         },
//       }
//     }
//
//     throw Error('Что-то пошло не так');
//   } catch (e) {
//     console.error(e);
//
//     return {
//       props: {}
//     }
//   }
// }

export default React.memo(Docs);
