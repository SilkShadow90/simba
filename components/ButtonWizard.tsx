import React, { PropsWithChildren } from "react";

import styles from "../styles/ButtonWizard.module.css";

interface Props {
  onClickPrev?: any;
  onClickNext?:any;
  onSubmit?(): void;
  prevText: string;
  nextText: string;
}

export const ButtonWizard:any = ({ onClickPrev, onClickNext, prevText, nextText, onSubmit }: PropsWithChildren<Props>) => {

  return (
    <div className={styles.ButtonWizardLink}>
      <button className={styles.Button} onClick={onClickPrev}>{prevText}</button>
      <div style={{ width:"16px" }}/>
      <button className={styles.Button} onClick={onClickNext}>{nextText}</button>

      {!!onSubmit && (
        <>
          <div style={{ width:"16px" }}/>
          <button className={styles.Button} onClick={onSubmit}>{'Завершить'}</button>
        </>
      )}
    </div>
  );
};
