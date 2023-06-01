import React, { useEffect, useMemo, useRef, useState } from 'react';
import dayjs from "dayjs";
import { reduxForm, Field, Form } from "redux-form";
import { useWizard, Wizard } from "react-use-wizard";
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';
import { useFetchService } from "../utils/useFetchService";
import { DocsComponentInput } from "./DocsComponentInput";
import { onChangeInput } from "../utils";
import { ExhibitionForm, ExhibitionFormRef } from './docs/ExhibitionForm';
import DictionaryMethods from '../api/DictionaryMethods';
import { Breed, Title } from '../api/types';
import {  AdminMyCustomSelectHOC } from "./adminPanel/AdminMyCustomSelect";
import { ButtonWizard } from "./ButtonWizard";

export const DocsComponentTitles:any = reduxForm({
  form: 'title',
  destroyOnUnmount: false,
})(({ handleSubmit }) => {
  const { data: breeds } = useFetchService(DictionaryMethods.getBreeds);
  const { data: titlesData } = useFetchService(DictionaryMethods.getTitles);

  const [birthday, setBirthday] = useState<string>('');
  const [isAdult, setAdult] = useState<boolean>();
  const [isJunior, setJunior] = useState<boolean>();
  const [isKitten, setKitten] = useState<boolean>();
  const [isHomeCat, setHomeCat] = useState<boolean>();
  const [breed, setBreed] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [castration, setCastration] = useState<boolean>();
  const [titles, setTitles] = useState<Title[]>([]);

  const [exhibitionCount, setExhibitionCount] = useState(0);

  const exhibitionFormRef = useRef<ExhibitionFormRef[]>([]);

  useEffect(() => {
    exhibitionFormRef.current.length = exhibitionCount;
  }, [exhibitionCount]);

  const onSubmit = async (form) => {
    console.log(form);
  };



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


  useEffect(() => {
    switch (breed) {
      case "HHP":
        setHomeCat(true);
        break;
      default:
        setHomeCat(false);
    }
  }, [breed]);

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

      const castrationCheck = (): boolean => {
        if (castration) {
          return !!title.castration;
        }

        return !title.castration;
      };

      const juniorCheck = (): boolean => {
        if (isJunior) {
          return !!title.junior;
        }

        return true;
      };

      const adultCheck = (): boolean => {
        if (isAdult) {
          return !title.junior && !title.kitten;
        }

        return true;
      };

      const kittenCheck = (): boolean => {
        if (isKitten) {
          return !!title.kitten;
        }

        return true;
      };

      return castrationCheck() && juniorCheck() && kittenCheck() && adultCheck();
    });
  }, [isJunior, isKitten, isAdult, castration, isHomeCat, titles]);


  const secondFilteredTitles = useMemo(() => {
    if (currentTitle ==='none') {
      return filteredTitles.slice(0, 1);
    }

    if (currentTitle) {
      const currentIndex: number = filteredTitles?.findIndex((title) => {
        return currentTitle === title.code;
      });

      if (currentIndex !== -1) {
        return filteredTitles.slice(currentIndex, currentIndex + 2);
      }
    }

    return [];
  }, [currentTitle, filteredTitles]);

  useEffect(() => {
    if (filteredTitles) {
      setCurrentTitle(filteredTitles?.[0]?.code || '');
    }
  }, [isAdult, isJunior, isKitten, castration, filteredTitles]);


  const breedSelectHOC = useMemo(() => AdminMyCustomSelectHOC({
    name:"breed",
    options:[
      { value:Strings.CatInformationForm.other.selectBreed, label:Strings.CatInformationForm.other.selectBreed },
    ].concat(breeds?.map((breed: Breed) => (
      { value:breed.code, label:`${breed.name} (${breed.code})` })) || []) }),
    [breeds]);

  const genderSelectHOC = useMemo(() => AdminMyCustomSelectHOC({
      name:"gender",
      options:[
        { value:Strings.CatInformationForm.other.selectGender, label:Strings.CatInformationForm.other.selectGender },
        { value:Strings.titulStart.titulMain.other.catMan, label: Strings.titulStart.titulMain.other.catMan },
        { value:Strings.titulStart.titulMain.other.catGirl, label: Strings.titulStart.titulMain.other.catGirl },
        { value:Strings.titulStart.titulMain.other.catManHalf, label: Strings.titulStart.titulMain.other.catManHalf },
        { value:Strings.titulStart.titulMain.other.catGirlHalf, label: Strings.titulStart.titulMain.other.catGirlHalf },
      ] }),
    []);


  const titleSelectHOC = useMemo(() => AdminMyCustomSelectHOC({
      name:"CurrentTitle",
      options:[
        { value:Strings.CatInformationForm.other.selectGender, label:Strings.CatInformationForm.other.selectGender },
        { value:"none", label: Strings.CatInformationForm.other.noneTitle }]
        .concat(filteredTitles?.map((titul: Title) => (
          { value:titul.code, label:`${titul.name} (${titul.code})` })) || []
        )
  }),
    [filteredTitles]);

  const newTitleSelectHOC = useMemo(() => AdminMyCustomSelectHOC({
      name:"NewCurrentTitle",
      options:[
        { value:Strings.CatInformationForm.other.selectGender, label:Strings.CatInformationForm.other.selectGender }]
        .concat(secondFilteredTitles?.map((titul: Title) => (
          { value:titul.code, label:`${titul.name} (${titul.code})` })) || []
        )
    }),
    [secondFilteredTitles]);

  const Step1 = () => {
    const {  previousStep, nextStep } = useWizard();

    return (
      <>
        <div className={styles.docsRightTitul}>{Strings.titulStart.titulHeader.title}</div>
        <div className={styles.docsRightMain}>{Strings.titulStart.titulHeader.postTitle}</div>
        <div className={styles.docsRightEnd}>{Strings.titulStart.titulHeader.info}</div>
        <div className={styles.docsRightEnd}>{Strings.titulStart.titulHeader.postInfo}</div>
        <button className={styles.docsButton}>{Strings.titulStart.titulHeader.button}</button>

        <div className={styles.docsRightTitle}>{Strings.titulStart.titulMain.title}</div>
        <div className={styles.docsRightEnd}>{Strings.titulStart.titulMain.postTitle}</div>
        <div className={styles.docsRightEnd}>{Strings.titulStart.titulMain.info}
        </div>
        <div className={styles.docsRightEnd}>{Strings.titulStart.titulMain.postInfo}</div>
        <ButtonWizard prevText={"Назад"} nextText={"Дальше"} onClickPrev={() => previousStep()} onClickNext={() => nextStep()}/>
      </>
    );
  };
  const Step2 = () => {
    const { previousStep, nextStep } = useWizard();

    return (
      <>
        <DocsComponentInput name={"nameAnimal"} text={Strings.CatInformationForm.other.nameAminal}  type={"text"}/>
        <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.breed}</div>

        <Field
          name={"breed"}
          component={breedSelectHOC}
        />
        <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.gender}</div>
        <Field
          name={"gender"}
          component={genderSelectHOC}
        />

        <div className={styles.docsPreSelect}>{Strings.titulStart.titulMain.other.birthsday}</div>
        <Field component={"input"} className={styles.docsSelect} onChange={onChangeInput(setBirthday)} value={birthday} type="date"/>

        <div className={styles.docsPreSelect}>{Strings.titulStart.titulMain.other.lastTitle}</div>

        <Field
          component={titleSelectHOC}
          name={"currentTitle"}
        />

        <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.nextTitle}</div>
        <Field
          component={newTitleSelectHOC}
          name={newCurrentTitle}
        />

        <DocsComponentInput text={Strings.CatInformationForm.other.colorStock} name={"colorStock"} type={"text"}/>

        <DocsComponentInput text={Strings.CatInformationForm.other.numberParents} name={"numberParents"} type={"text"}/>
        <ButtonWizard prevText={"Назад"} nextText={"Дальше"} onClickPrev={previousStep} onClickNext={nextStep}/>
      </>
    );
  };

    const Step3 = () => {
      const { previousStep, nextStep } = useWizard();
      return (
        <>
          <div className={styles.docsRightInputs}>
            <ExhibitionForm title={"Выставка 1"} prefix={'ex1-'} />
          </div>
          <div style={{ display: 'flex', marginBottom: '20px' ,padding:"0 10px 0 10px" }}>
            <input style={{ marginRight:"10px"}} type="checkbox"/>
            <div className={styles.docsRightEnd}>{Strings.titulStart.titulEnd.postText}
            </div>
          </div>

          <ButtonWizard onSubmit={onSubmit} prevText={"Назад"} nextText={"Добавить выставку"} onClickPrev={previousStep} onClickNext={nextStep} />
        </>
      );
    };

  const Step4 = () => {
    const { previousStep, nextStep } = useWizard();
    return (
      <>
        <div className={styles.docsRightInputs}>
          <ExhibitionForm title={"Выставка 2"} prefix={'ex2-'} />
        </div>
        <div style={{ display: 'flex', marginBottom: '20px' ,padding:"0 10px 0 10px" }}>
          <input style={{ marginRight:"10px" }} type="checkbox"/>
          <div className={styles.docsRightEnd}>{Strings.titulStart.titulEnd.postText}
          </div>
        </div>
        <ButtonWizard onSubmit={onSubmit} prevText={"Назад"} nextText={"Добавить выставку"} onClickPrev={previousStep} onClickNext={nextStep}/>
      </>
    );
  };

  const Step5 = () => {
    const { previousStep } = useWizard();
    return (
      <>
        <div className={styles.docsRightInputs}>
          <ExhibitionForm title={"Выставка 3"} prefix={'ex3-'} />
        </div>
        <div style={{ display: 'flex', marginBottom: '20px' ,padding:"0 10px 0 10px" }}>
          <input style={{ marginRight:"10px"}} type="checkbox"/>
          <div className={styles.docsRightEnd}>{Strings.titulStart.titulEnd.postText}
          </div>
        </div>
        <ButtonWizard prevText={"Назад"} nextText={"Завершить"} onClickPrev={previousStep} onClickNext={onSubmit}/>
      </>
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.docsRightVstuplenie}>
        <Wizard>
          <Step1 />
          <Step2 />
          <Step3 />
          <Step4 />
          <Step5 />
        </Wizard>
      </div>
    </Form>
  );
});
