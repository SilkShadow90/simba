import React, { ChangeEvent, Ref, useImperativeHandle, useState } from 'react';
import styles from '../../styles/docs/ExhibitionForm.module.css';
import { DocsComponentInput } from '../DocsComponentInput';

type Props = {
  title: string
}

export type ExhibitionFormRef = {
  getForm(): {
    ExhibitionDate: string;
    address: string;
    licenseNumber: string;
    club: string;
    expert: string;
    evaluation: string;
    evaluationSheet: string;
  }
}

const RenderExhibitionForm = ({ title }: Props, ref: Ref<ExhibitionFormRef>): React.ReactElement<Props> => {
  const [ExhibitionDate, setExhibitionDate] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [licenseNumber, setLicenseNumber] = useState<string>('')
  const [club, setClub] = useState<string>('')
  const [expert, setExpert] = useState<string>('')
  const [evaluation, setEvaluation] = useState<string>('')
  const [evaluationSheet, setEvaluationSheet] = useState<string>('')

  useImperativeHandle(ref, () => ({
    getForm: () => {
      return {
        ExhibitionDate,
        address,
        licenseNumber,
        club,
        expert,
        evaluation,
        evaluationSheet,
      }
    }
  }));

  const onChangeExhibitionDate = (e: ChangeEvent<HTMLInputElement>) => {
    setExhibitionDate(e.target.value)
  };

  const onChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  };

  const onChangeLicenseNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setLicenseNumber(e.target.value)
  };

  const onChangeClub = (e: ChangeEvent<HTMLInputElement>) => {
    setClub(e.target.value)
  };

  const onChangeExpert = (e: ChangeEvent<HTMLInputElement>) => {
    setExpert(e.target.value)
  };

  const onChangeEvaluation = (e: ChangeEvent<HTMLInputElement>) => {
    setEvaluation(e.target.value)
  };

  const onChangeEvaluationSheet = (e: ChangeEvent<HTMLInputElement>) => {
    setEvaluationSheet(e.target.value)
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>{title}</div>
      <DocsComponentInput
        text={"Дата выставки(*)"}
        onChange={onChangeExhibitionDate}
        value={ExhibitionDate}
        type={"date"}
      />
      <DocsComponentInput
        text={"Место проведения(*)"}
        onChange={onChangeAddress}
        value={address}
        type={"text"}
      />
      <DocsComponentInput
        text={"Номер лицензии(*)"}
        onChange={onChangeLicenseNumber}
        value={licenseNumber}
        type={"text"}
      />
      <DocsComponentInput
        text={"Клуб(*)"}
        onChange={onChangeClub}
        value={club}
        type={"text"}
      />
      <DocsComponentInput
        text={"Эксперт(*)"}
        onChange={onChangeExpert}
        value={expert}
        type={"text"}
      />
      <DocsComponentInput
        text={"Оценка, титул(*)"}
        onChange={onChangeEvaluation}
        value={evaluation}
        type={"text"}
      />
      <DocsComponentInput
        text={"Оценочный лист, диплом(*)"}
        onChange={onChangeEvaluationSheet}
        value={evaluationSheet}
        type={"file"}
      />
    </div>
  )
}

export const ExhibitionForm = React.memo(React.forwardRef(RenderExhibitionForm))
