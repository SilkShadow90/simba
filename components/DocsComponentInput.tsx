import React, { ChangeEvent, useMemo } from 'react';
import styles from '../styles/Input.module.css';
import { Field } from "redux-form";

interface Props {
  name:string;
  text: string;
  type?: string;
  useContainer?: boolean;
}


const RenderDocsComponentInput: React.FC<Props> = ({
  name,
  text,
  type = 'text',
  useContainer,
}: Props): React.ReactElement<Props> => {
  const content = useMemo(() => (
    <div>
        <div className={styles.inputPreSelect}>{text}</div>
        <Field
          name={name}
          component={"input"}
          className={styles.inputSelect}
          type={type}
        />
    </div>
  ), [text, type,]);

  if (useContainer) {
    return (
      <div>
        {content}
      </div>
    );
  }

  return content;
};

export const DocsComponentInput: React.FC<Props> = React.memo(RenderDocsComponentInput);
