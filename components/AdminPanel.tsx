import styles from "../styles/Admin.module.css";
import React, { PropsWithChildren, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';


interface Props {
    text: string;
    type: string
}

export const AdminPanel = ({text, type}: PropsWithChildren<Props>) => {
    const dispatch = useDispatch()
    const isOpened = useSelector((state: any) => state.adminState[type])

    const onClick = useCallback(() => dispatch({
        type: `admin/${type}`,
    }), [dispatch, type])

    return (
        <button
          className={isOpened ? styles.adminCardsLeftColumnRed : styles.adminCardsLeftColumn }
          onClick={onClick}
        >
            {text}
        </button>
    )
}

export const DocsPanel = ({text, type}: PropsWithChildren<Props>) => {
    const dispatch = useDispatch()
    const isOpened = useSelector((state: any) => state.docsState[type])

    const onClick = useCallback(() => dispatch({
        type: `docs/${type}`,
    }), [dispatch, type])

    return (
        <button
            className={isOpened ? styles.adminCardsLeftColumnRed : styles.adminCardsLeftColumn }
            onClick={onClick}
        >
            {text}
        </button>
    )
}
