import React, { ChangeEvent, useMemo } from 'react';
import styles from '../styles/Input.module.css';

interface Props {
  text: string;
  type?: string;
  value?: string;
  useContainer?: boolean;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
}


const RenderDocsComponentInput: React.FC<Props> = ({
  text,
  type = 'text',
  value,
  useContainer,
  onChange = () => {},
}: Props): React.ReactElement<Props> => {
  const content = useMemo(() => (
    <>
      <div className={styles.inputPreSelect}>{text}</div>
      <input
        className={styles.inputSelect}
        onChange={onChange}
        value={value}
        type={type}
      />
    </>
  ), [onChange, text, type, value]);

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
