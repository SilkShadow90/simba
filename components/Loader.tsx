import styles from "../styles/Loader.module.css";
import React, {PropsWithChildren, useState} from "react";
import classNames from 'classnames';

interface Props {
    // active: boolean;
    // onClose(): void;
}

const Loader = ({ }: PropsWithChildren<Props>) => {
    const [disabled, setDisabled] = useState(true)
    return (
        <div className={styles.loader}/>
    )
}

export default Loader;