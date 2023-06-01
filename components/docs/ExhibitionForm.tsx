import React, { Ref, useImperativeHandle, useState } from 'react';
import styles from '../../styles/docs/ExhibitionForm.module.css';
import { DocsComponentInput } from '../DocsComponentInput';
import { Strings } from '../../resources';
import { onChangeInput } from "../../utils";

type Props = {
  title: string
  prefix?: string
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

const RenderExhibitionForm = ({ title, prefix = '' }: Props, ref: Ref<ExhibitionFormRef>): React.ReactElement<Props> => {
  const [ExhibitionDate, setExhibitionDate] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [licenseNumber, setLicenseNumber] = useState<string>('');
  const [club, setClub] = useState<string>('');
  const [expert, setExpert] = useState<string>('');
  const [evaluation, setEvaluation] = useState<string>('');
  const [evaluationSheet, setEvaluationSheet] = useState<string>('');

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
      };
    }
  }));


  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>{title}</div>
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.ExhibitionDate}
        name={`${prefix}ExhibitionDate`}
        type="date"
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.Venue}
        name={`${prefix}Venue`}
        type="text"
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.LicenseNumber}
        name={`${prefix}LicenseNumber`}
        type="text"
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.Club}
        name={`${prefix}Club`}
        type="text"
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.Expert}
        name={`${prefix}Expert`}
        type="text"
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.Evaluation}
        name={`${prefix}Evaluation`}
        type="text"
      />
      <DocsComponentInput
        text={Strings.RenderExhibitionForm.EvaluationSheet}
        name={`${prefix}EvaluationSheet`}
        type="file"
      />
    </div>
  );
};

export const ExhibitionForm = React.memo(React.forwardRef(RenderExhibitionForm));
