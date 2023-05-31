import React, { useMemo } from 'react';
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';
import {useFetchService} from "../utils/useFetchService";
import {DocsComponentInput} from "./DocsComponentInput";
import {
  Catgirl,
  Catman,
  Infocatgirl,
  Infocatman
} from './docs/CatInformationForm';
import DictionaryMethods from '../api/DictionaryMethods';
import {Breed} from '../api/types';
import {reduxForm, Field, Form} from "redux-form";
import {AdminMyCustomSelectHOC} from "./adminPanel/AdminMyCustomSelect";
import {useWizard, Wizard} from "react-use-wizard";
import {ButtonWizard} from "./ButtonWizard";



export const DocsComponentVyazka:any = reduxForm({
  form: 'breeding',
  destroyOnUnmount: false,
  initialValues: true //не уверен что нужно
})( ({handleSubmit}) => {
    const { data: breeds } = useFetchService(DictionaryMethods.getBreeds) || {};

    const anyJuniorSelectHOC = useMemo(() => AdminMyCustomSelectHOC({
          name:"anyJunior",
          options:[
              {value:"1", label:"1"},]
          .concat(new Array(10).fill(null).map((_, index) => (
            {value:index + 1,label:`${index + 1}`})) || []
          )
      }),
      []);

    const genderSelectHOC = useMemo(() => AdminMyCustomSelectHOC({
          name:"gender",
          options:[
              {value:Strings.vyazka.vyazkaMain.selectGenderJunior, label:Strings.vyazka.vyazkaMain.selectGenderJunior},
              {value:Strings.titulStart.titulMain.other.catMan ,label: Strings.titulStart.titulMain.other.catMan},
              {value:Strings.titulStart.titulMain.other.catGirl ,label: Strings.titulStart.titulMain.other.catGirl},
          ]}),
      []);

    const breedSelectHOC = useMemo(() => AdminMyCustomSelectHOC({
          name:"breed",
          options:[
              {value:Strings.CatInformationForm.other.selectBreed, label:Strings.CatInformationForm.other.selectBreed},
          ].concat(breeds?.map((breed: Breed) => (
            {value:breed.code,label:`${breed.name} (${breed.code})`})) || [])}),
      [breeds]);


    if (!breeds?.length) {
      return null;
    }

    const Step1 = () => {
        const { previousStep, nextStep } = useWizard();

        return (
          <>
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
            <ButtonWizard prevText={"Назад"} nextText={"Дальше"} onClickPrev={() => previousStep()} onClickNext={() => nextStep()}/>
          </>
        );
    };
    const Step2 = () => {
        const { previousStep, nextStep } = useWizard();

        return (
          <>
            <Catman/>
            <ButtonWizard prevText={"Назад"} nextText={"Дальше"} onClickPrev={() => previousStep()} onClickNext={() => nextStep()}/>
          </>
        );
    };
  const Step3 = () => {
    const { previousStep, nextStep } = useWizard();

    return (
      <>
        <Infocatman breeds={breeds}/>
        <ButtonWizard prevText={"Назад"} nextText={"Дальше"} onClickPrev={() => previousStep()} onClickNext={() => nextStep()}/>
      </>
    );
  };
  const Step4 = () => {
    const { previousStep, nextStep } = useWizard();

    return (
      <>
        <Catgirl/>
        <ButtonWizard prevText={"Назад"} nextText={"Дальше"} onClickPrev={() => previousStep()} onClickNext={() => nextStep()}/>
      </>
    );
  };
  const Step5 = () => {
    const { previousStep, nextStep } = useWizard();

    return (
      <>
        <Infocatgirl breeds={breeds}/>
        <ButtonWizard prevText={"Назад"} nextText={"Дальше"} onClickPrev={() => previousStep()} onClickNext={() => nextStep()}/>
      </>
    );
  };
    const Step6 = () => {
        const { previousStep, nextStep } = useWizard();

        return (
          <>
              <div className={styles.docsVstuplenieColumnNext}>
                  <DocsComponentInput
                    useContainer
                    text={Strings.vyazka.vyazkaMain.dataVyazka}
                    name={"date"}
                    type="date"
                  />
                  <DocsComponentInput
                    useContainer
                    text={Strings.vyazka.vyazkaMain.dateBirthsdayJunior}
                    name={"birthsday"}
                    type="date"
                  />
                  <div>
                      <div className={styles.docsPreSelect}>{Strings.vyazka.vyazkaMain.anyJunior}</div>
                      <Field
                        component={anyJuniorSelectHOC}
                        name={"anyJunior"}
                      />
                  </div>
              </div>
              <div className={styles.docsRightTitul}>{Strings.vyazka.vyazkaMain.juniorCats}</div>
              <div className={styles.docsRightMain}>{Strings.vyazka.vyazkaMain.infoJuniorCats}</div>
              <div className={styles.docsVstuplenieColumnPreNext}>
                  <div>
                      <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.gender}</div>
                      <Field
                        name={"gender"}
                        component={genderSelectHOC}
                      />
                  </div>
                  <div>
                      <div className={styles.docsPreSelect}>{Strings.CatInformationForm.other.miniBreed}</div>
                      <Field
                        name={"breed"}
                        component={breedSelectHOC}
                      />
                  </div>
                  <DocsComponentInput useContainer text={Strings.CatInformationForm.other.color}  name={"color"} type={"text"}/>
                  <DocsComponentInput useContainer text={Strings.CatInformationForm.other.miniNameAnimal} name={"animalName"}  type={"text"}/>
              </div>
              <div style={{ display: 'flex', marginBottom: '20px'}}>
                  <input type="checkbox"/>
                  <div style={{width:"10px"}}/>
                  <div>
                    {Strings.vyazka.vyazkaMain.button.title}
                  </div>
              </div>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                  <input type="checkbox"/>
                <div style={{width:"10px"}}/>
                  <div>
                    {Strings.vyazka.vyazkaMain.button.text}
                  </div>
              </div>
            <ButtonWizard prevText={"Назад"} nextText={"Завершить"} onClickPrev={() => previousStep()} onClickNext={() => nextStep()}/>
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
              <Step6 />
            </Wizard>
        </div>
      </Form>
    );
});
