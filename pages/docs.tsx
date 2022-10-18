import type { NextPage } from 'next';
import styles from '../styles/Docs.module.css';
import React, {ChangeEvent, ChangeEventHandler, FC, useCallback, useEffect, useState} from 'react';
import { Page } from '../components/Page';
import { DocsPanel } from '../components/DocsPanel';
import { useSelector } from 'react-redux';
import { ApiResponse, fetcher } from '../utils';

import useSWR from 'swr'


type Breed = {
  id: string
  value: string
  description: string
}

type Titul = {
    id: string
    value: string
    description: string
    key: string
}



const Docs: NextPage = () => {


  const docsState = useSelector((state: any) => state.docsState);

  const { data: responseBreed } = useSWR<ApiResponse<Breed[]>>('/api/breeds', fetcher)

  const { data: breeds } = responseBreed || {}

    const { data: responseTitul } = useSWR<ApiResponse<Titul[]>>('/api/tituls', fetcher)

    const { data: tituls } = responseTitul || {}

  // const getData = useCallback(async () => {
  //
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, []);

  const renderSecondElement = () => {

      const [breed, setBreed] = useState<string>('')

      const [birthsday, setBirthsday] = useState<string>('')

      const [gender, setGender] = useState<string>('')

      const [titules, setTitules] = useState<any>(tituls)

      console.log("1",tituls)

      useEffect(() => {
          switch (gender) {
              case "Кот":
                  console.log("Ты выбрал кота");
                  setTitules(tituls?.filter((titul)=> {
                   return titul.key == "nocastration"
                  }))
                  break;
              case "Кошка":
                  console.log("Ты выбрал Кошка");
                  break;
              case "Кастрированный кот":
                  console.log("Ты выбрал Кастрированный кот");
                  break;
              case "Стерилизованная кошка":
                  console.log("Ты выбрал Стерилизованная кошка");
                  break;
              default:
                  console.log("Не правильно")
          }
      }, [gender])

      const [newTitules, setNewTitules] = useState<string>('')

      const onChangeBreed = (e: ChangeEvent<HTMLSelectElement>) => {
          console.log(e.target.value)
          setBreed(e.target.value)
      }

      const onChangeTitules = (e: ChangeEvent<HTMLSelectElement>) => {
          console.log(e.target.value)
          setTitules(e.target.value)
      }
      const onChangeBirthsday = (e: ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value)
          setBirthsday(e.target.value)
      }
      const onChangeGender = (e: ChangeEvent<HTMLSelectElement>) => {
          console.log(e.target.value)
          setGender(e.target.value)
      }

      const onChangeNewTitules = (e: ChangeEvent<HTMLSelectElement>) => {
          console.log(e.target.value)
          setNewTitules(e.target.value)
      }

    switch (Object.entries(docsState).find(([_, value]) => value)?.[0]) {
      case 'openedvstuplenie':
        return (
          <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>Заявление на вступление в клуб</div>
            <div className={styles.docsRightMain}>Как вступить в наш клуб:</div>
            <div className={styles.docsRightEnd}>В клуб принимаются лица, старше 18 лет</div>
            <ul>
              <li className={styles.docsLi}>скачайте и заполните заявление на вступление в клуб</li>
              <li className={styles.docsLi}>заполненное заявление принесите нам в приемные дни клуба</li>
              <li className={styles.docsLi}>не забудьте родословную на вашу кошку</li>
              <li className={styles.docsLi}>оплатите вступительный взнос</li>
            </ul>
            <button className={styles.docsButton}>Скачать заявление на вступление в клуб</button>
          </div>
        );
      case 'openedtitul':


        return (
          <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>Заявление на титул</div>
            <div className={styles.docsRightMain}>Оформление титульного сертификата</div>
            <div className={styles.docsRightEnd}>Для оформления титульного сертификата необходимо заполнить заявление на
              оформление титульного сертификата
              и предоставить копии оценочных листов с лицензированных WCF выставок.
            </div>
            <div className={styles.docsRightEnd}>Как же вы можете заполнить он-лайн форму заявления на оформление
              титульного сертификата и
              приложить сканы оценочных листов с лицензированных WCF выставок.
            </div>
            <button className={styles.docsButton}>Скачать заявление на титул</button>

            <div className={styles.docsRightTitul}>Титульный сертификат</div>
            <div className={styles.docsRightEnd}>Заполните все обязательные поля формы.</div>
            <div className={styles.docsRightEnd}>Заявка будет успешно отправлена, если вашей заявке присвоится номер
              TITLE-ХХХ
            </div>
            <div className={styles.docsRightEnd}>Если вы не получили письмо с заявкой на указанный Вами емейл -
              проверьте папку Спам,
              возможно она там. Или свяжитесь с нами любым способом
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
                  <option className={styles.docsOption} value="Кот"> Кот</option>
                  <option className={styles.docsOption} value="Кошка"> Кошка</option>
                  <option className={styles.docsOption} value="Кастрированный кот"> Кастрированный кот</option>
                  <option className={styles.docsOption} value="Стерилизованная кошка"> Стерилизованная кошка</option>
              </select>

              <div className={styles.docsPreSelect}>Последний полученный титул</div>
              <select className={styles.docsSelect} onChange={onChangeTitules} value={titules} name="Выберите титул" id="">
                  <option className={styles.docsOption}  value="Выберите титул">Выберите титул</option>
                  {tituls?.map((titul: Titul) => (
                      <option key={titul.id} className={styles.docsOption} value={titul.value}>{titul.description}</option>
                  ))}
              </select>
              <div className={styles.docsPreSelect}>Запрашиваемый титул(*)</div>
              <select className={styles.docsSelect} onChange={onChangeNewTitules} value={newTitules} name="Выберите титул" id="">
                  <option className={styles.docsOption} value="Выберите титул">Выберите титул</option>
                  {tituls?.map((titul: Titul) => (
                      <option key={titul.id} className={styles.docsOption} value={titul.value}>{titul.description}</option>
                  ))}
              </select>

            <div className={styles.docsPreSelect}>Окрас</div>
            <input className={styles.docsSelect} onChange={e => console.log(e.target.value)} type="text"/>

            <div className={styles.docsPreSelect}>Дата рождения(*)</div>
            <input className={styles.docsSelect} onChange={onChangeBirthsday} value={birthsday} type="date"/>

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
            <div className={styles.docsRightMain}>Регистрация питомника</div>
            <div className={styles.docsRightEnd}>Регистрация питомника (заводской приставки) в WCF</div>
            <div className={styles.docsRightEnd}>Для регистрации питомника необходимо выполнение нижеследующих
              условий:
            </div>
            <ul>
              <li className={styles.docsLi}>наличие хотя бы одного племенного животного женского пола не старше 6 лет,
              </li>
              <li className={styles.docsLi}>законченные очные или заочные фелинологические курсы;</li>
              <li className={styles.docsLi}>членство в КЛК Симба</li>
            </ul>
            <div className={styles.docsRightEnd}>Название питомника регистрируется на любом из трех международных языков
              WCF
              (английский, французский, немецкий). Название питомника может состоять из одного или двух слов и не должно
              превышать 15 символов, включая пробелы. Не разрешается использовать уже зафиксированные названия
              питомников
              , слова cats, cat, kitten, Paw, Pouw, Claws, Sweet, Gold/Golden, Silver, Pets, Purr, Furr, Fluffy, Furry,
              Angel/Engel,
              Bear, Baby Chubby, Kingdom, Queen, King, Lion, Kitten/Kity, Garden, Sun, Moon, Paradise, Meow, Saphir,
              Crystal, Patiler,
              Luxury, Diamond, Pearl, Saphir,
              Coco названия известных мировых брендов (например - Chanel, Porshe и пр.), названия пород кошек.
            </div>
            <div className={styles.docsRightEnd}>Проверить имя на занятость можно на официальном сайте WCF</div>
            <div className={styles.docsRightEnd}>Название питомника фиксируется в соответствующем сертификате.</div>
            <div className={styles.docsRightEnd}>Название питомника ставится в кличке животного как префикс (перед
              кличкой)
              или как суффикс (после клички)
              по усмотрению заводчика.
            </div>
            <div className={styles.docsRightEnd}>Использование названия питомника для пометов, полученных от
              производителей,
              не принадлежащих
              данному питомнику категорически запрещается.
            </div>
            <button className={styles.docsButton}>Скачать заявление на регистрацию питомника</button>

            <div className={styles.docsRightMain}>Определения и правила регистрация названия питомника</div>
            <div className={styles.docsRightEndTitle}>1. Заводчик:</div>
            <div className={styles.docsRightEnd}>Заводчик - это человек, который подает заявку на получение родословных
              в своем клубе для котят,
              рожденных в его питомнике (в коллективном питомнике).
            </div>
            <div className={styles.docsRightEndTitle}>2. Котята-Помет.</div>
            <div className={styles.docsRightEnd}>Каждый котенок, рожденный в питомнике (в коллективном питомнике),
              должен иметь название питомника и родословную, выданную его клубом.
            </div>
            <div className={styles.docsRightEndTitle}>3. Название питомника.</div>
            <div className={styles.docsRightEnd}> Название питомника - это имя, которое применяется и регистрируется в
              WCF и которое,
              следовательно, защищено. Каждое название питомника запрашивается в офисе в WCF. 3 предлагаемые названия
              питомника
              (в последовательности их приоритета) должны быть запрошены через клуб заводчика.
            </div>
            <div className={styles.docsRightEnd}>Предлагаемые названия питомников будут проверены,
              если аналогичные названия питомников уже зарегистрированы. Не разрешается предлагать какие-либо имена
              людей
              (из-за закона о правах имен) - кроме собственного имени, никаких названий государственных должностей,
              никаких названий
              защищенных авторским правом документов
              (романов, повестей,литературное произведение и т. д.) и никаких названий пород.
            </div>
            <div className={styles.docsRightEnd}>Заводчики с зарегистрированным доказуемым названием питомника в другой
              организации,
              желающие присоединиться к WCF, могут сохранить свои имя питомника.
              Если название уже используется в другом месте, код страны должен быть добавлен за именем.
            </div>
            <div className={styles.docsRightEnd}>Офис WCF проверяет уникальность названий питомников только в рамках
              WCF.
              Все названия питомника WCF по состоянию на текущий год опубликованы на сайте.
            </div>
            <div className={styles.docsRightEnd}>Имена, не опубликованные на данный момент
              , доступны заводчикам клуба WCF автоматически.
            </div>
            <div className={styles.docsRightEnd}>Офис ответит на поступающие заявки в течение 10 рабочих дней
              и подтвердит регистрацию названия питомника.
            </div>
            <div className={styles.docsRightEndTitle}>4. Защита имени питомника.</div>
            <div className={styles.docsRightEnd}>Зарегистрированное название питомника будет защищено 20 лет и не может
              быть выдано повторно в течение этого времени.
              Защита названия питомника может быть продлена за отдельную плату.
            </div>
            <div className={styles.docsRightEndTitle}>5. Передача имени питомника.</div>
            <div className={styles.docsRightEnd}>Название питомника может быть передано заводчиком другому
              заводчику по письменному договору, подписанному обоими заводчиками, который должен быть направлен в офис
              WCF.
              Когда заводчик умирает, наследник должен засвидетельствовать,
              что он является законным наследником, чтобы взять или передать название питомника.
            </div>
            <div className={styles.docsRightEndTitle}>6. Коллективный питомник</div>
            <div className={styles.docsRightEnd}>Название питомника может быть запрошено также 2 или более заводчиками
              вместе,
              если эти заводчики образуют сообщество. Тем не менее, должна быть один главный заводчик,
              который получит название питомника, когда сообщество будет распущено.
              Заводчики, покинувшие сообщество, должны подать заявку на новое название питомника.
            </div>
            <div className={styles.docsRightEndTitle}>7. Имя кошки</div>
            <div className={styles.docsRightEnd}>В общем случае имя кошки состоит из имени и названия питомника.
              Полное имя кошки – имя и название питомника не может быть длиннее 25 символов.
            </div>
            <div className={styles.docsRightEndTitle}>8. Расположение названия питомника</div>
            <div className={styles.docsRightEnd}>Название питомника может быть до или после первого имени кошки.
              Вы должны указать это, когда подаете заявку на название питомника.
            </div>
            <div className={styles.docsRightEnd}>Префикс и суффикс считаются длиной всего имени кошки.</div>
          </div>
        );
      case 'openedvyazka':
        return (
          <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>Направление на вязку</div>
            <div className={styles.docsRightMain}>Направление на вязку и акт рождения котят</div>
            <div className={styles.docsRightEnd}> Согласно племенного положения клуба к племенной деятельности
              допускаются племенные коты и кошки:
            </div>
            <div className={styles.docsRightEnd}> Владельцы которых состоят в клубе КЛК Симба</div>
            <div className={styles.docsRightEnd}> Имеют разводные оценки с лицензированных выставок кошек WCF.
              Для кошек не ниже Отлично (Ex.), для кота - наличие титула Чемпион породы (Champion WCF) и выше.
            </div>
            <button className={styles.docsButton}>Скачать направление на вязку</button>
            <div className={styles.docsRightTitul}>Акт вязки</div>
            <div className={styles.docsRightMain}>Заполните все обязательные поля формы.</div>
            <div className={styles.docsRightEnd}>
              Заявка будет успешно отправлена, если вашей заявке присвоится номер KIT-ХХХ
            </div>
            <div className={styles.docsRightEnd}>
              Если вы не получили письмо с заявкой на указанный Вами емейл -
              проверьте папку Спам, возможно она там. Или свяжитесь с нами любым способом
            </div>
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
