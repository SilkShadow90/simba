import React, { ChangeEvent, Ref, useImperativeHandle, useState } from 'react';
import styles from '../../styles/docs/ExhibitionForm.module.css';
import { DocsComponentInput } from '../DocsComponentInput';
import { Strings } from '../../resources';
import {onChangeInput} from "../../utils/Func";


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


  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>{title}</div>
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.ExhibitionDate}
        onChange={onChangeInput(setExhibitionDate)}
        value={ExhibitionDate}
        type={"date"}
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.Venue}
        onChange={onChangeInput(setAddress)}
        value={address}
        type={"text"}
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.LicenseNumber}
        onChange={onChangeInput(setLicenseNumber)}
        value={licenseNumber}
        type={"text"}
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.Club}
        onChange={onChangeInput(setClub)}
        value={club}
        type={"text"}
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.Expert}
        onChange={onChangeInput(setExpert)}
        value={expert}
        type={"text"}
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.Evaluation}
        onChange={onChangeInput(setEvaluation)}
        value={evaluation}
        type={"text"}
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.EvaluationSheet}
        onChange={onChangeInput(setEvaluationSheet)}
        value={evaluationSheet}
        type={"file"}
      />
    </div>
  )
}

export const ExhibitionForm = React.memo(React.forwardRef(RenderExhibitionForm))
