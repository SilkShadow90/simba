import React from "react";
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';

import { Wizard, useWizard } from 'react-use-wizard';
import {AdminButton} from "./adminPanel/AdminButton";
import {ButtonWizard} from "./ButtonWizard";


export const DocsComponentOpened:any = () => {

    const Step1 = () => {
        const { handleStep, previousStep, nextStep } = useWizard();

        return (
          <>
            <div className={styles.docsRightTitul}>{Strings.docsStart.title}</div>
            <ButtonWizard prevText={"Назад"} nextText={"Дальше"} onClickPrev={() => previousStep()} onClickNext={() => nextStep()}/>
          </>
        );
    };
    const Step2 = () => {
        const { handleStep, previousStep, nextStep } = useWizard();

        // Attach an optional handler
        handleStep(() => {
            alert('Going to step 2');
        });

        return (
          <>
            <div className={styles.docsRightMain}>{Strings.docsStart.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.docsStart.info}</div>
            <ul className={styles.docsRightUL}>
              {Strings.docsStart.li.map(text => (
                <li key={text} className={styles.docsLi}>{text}</li>))}
            </ul>
            <button className={styles.docsButton}>{Strings.docsStart.titleDownload}</button>
            <ButtonWizard prevText={"Назад"} nextText={"Дальше"} onClickPrev={() => previousStep()} onClickNext={() => nextStep()}/>
          </>
        );
    };
    return (
      <>
        <div className={styles.docsRightVstuplenie}>
          <Wizard>
            <Step1 />
            <Step2 />
          </Wizard>
        </div>
      </>
    );
};
