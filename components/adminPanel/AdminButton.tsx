import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from '../../styles/adminStyles/AdminButton.module.css';
import Loader from '../Loader';

interface Props {
  text: string;

  onClick(): void;

  type?: 'primary' | 'secondary' | 'other';
  stretch?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export const AdminButton = ({ text, onClick, type, stretch, isLoading = false, disabled }: Props) => {


  const [buttonStyle, textStyle] = useMemo(
    (): [string, string] => {
      switch (type) {
        case 'primary' :
          return [styles.main_button_primary, styles.main_button_text_primary];
        case 'secondary' :
          return [styles.main_button_secondary, styles.main_button_text_secondary];
        case 'other' :
          return [styles.main_button_other, styles.main_button_text_other];
        default:
          return [styles.main_button_primary, styles.main_button_text_primary];
      }
    },
    [type],
  );

  return (
    <button disabled={disabled} className={classNames(buttonStyle, stretch && 'stretch')} color={''} onClick={isLoading ? undefined : onClick}>
      {isLoading ? (
        <div className="centered" style={{ height: '40px' }}>
          <Loader isVisible />
        </div>
      ) : (
        <div className={textStyle}>{text}</div>
      )}
    </button>
  );
};

