import React from 'react';
import classNames from 'classnames';
import styles from '../../styles/adminStyles/AdminTableTask.module.css';
import {AdminTask} from "./AdminTask";
import {Text} from "./Text";

interface Props {
  text?: string;

  onClick?(): void;

  type?: 'primary' | 'secondary' | 'other';
  stretch?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export const AdminTableTask = ({ text, onClick, type, stretch, isLoading = false, disabled }: Props) => {

  return (
    <div className={styles.tableMain}>
      <div className={styles.tableMain_center}>
        <div className={styles.tableMain_center_title}>
          <Text text={"Title"} size={"medium"} color={"darkBlack"}/>
          <div className={styles.tableMain_center_title_color}><Text text={"Type"} size={"small"} color={"gray"}/></div>
        </div>
        <div className={styles.tableMain_center_title}>
          <div>
            <Text text={"Due Date: "} size={"small"} color={"gray"}/>
            <Text text={"Data created"} size={"small"} color={"darkGray"}/>
          </div>
        </div>
        <div className={styles.tableMain_center_title_end}>
          <Text text={"User creator task"} size={"small"} color={"darkGray"}/>
          <div>
            <AdminTask text={"Новое"} color={"green"} type={"task"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

