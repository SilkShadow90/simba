import React, {PropsWithChildren, useState} from "react";
import classNames from 'classnames';
import styles from "../styles/Loader.module.css";

interface Props {
    isVisible: boolean
}

const Loader = ({ isVisible = false }: Props) => {
    if (isVisible) {
        return (
          <div className={styles.loaderMain} style={{ position: 'relative', display: 'inline-flex' }}>
            <div className={styles.loader} />
            <div className={styles.loader1}/>
            <div className={styles.loader2}/>
          </div>
        );
    }

    return null;
};

export default Loader;
