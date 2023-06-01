import React, {useMemo} from 'react';
import classNames from 'classnames';
import styles from '../../styles/adminStyles/AdminTask.module.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import arrowDown from "../../public/adminImg/other/arrow_down.svg";
import Image from "next/image";

interface Props {
  text: string;
  onChange?(): void;
  big?:boolean;
  type?: 'email' | 'task' | 'contact' | 'deal' | 'select';
  color?: 'purple' | 'green' | 'red' | 'yellow';
  options?: string[];
}

export const AdminTask = ({ onChange, type = 'task', color = 'green', text = 'Нет данных', options, big = false}: Props) => {

  const taskStyle = useMemo(
    (): string => {
      switch (type) {
        case 'email' :
          return styles.mainTask;
        case 'task' :
          return styles.mainTask;
        case 'contact' :
          return styles.mainTask;
        case 'deal' :
          return styles.mainTask;
        case 'select' :
          return styles.mainTask_Select;
        default:
          return styles.mainTask;
      }
    },
    [type],
  );

  const taskColor = useMemo(
    (): string => {
      switch (color) {
        case 'purple' :
          return styles.mainColor_purple;
        case 'green' :
          return styles.mainColor_green;
        case 'red' :
          return styles.mainColor_red;
        case 'yellow' :
          return styles.mainColor_yellow;
        default:
          return styles.mainColor_green;
      }
    },
    [color],
  );
  if (options) {
    return (
      <Dropdown
        className={classNames(!big ? taskStyle : styles.maxSize, taskColor)}
        controlClassName={styles.test}
        placeholderClassName={classNames(taskStyle, taskColor)}
        options={options}
        onChange={onChange}
        placeholder="text"
        arrowOpen={<Image className={styles.arrowImage} objectFit={'cover'} src={arrowDown}/>}
        arrowClosed={<Image className={styles.arrowImage} objectFit={'cover'} src={arrowDown}/>}
      />
    )
  }
  return (
    <div className={classNames(!big ? taskStyle : styles.maxSize, taskColor)}>{text}</div>
  );
};

