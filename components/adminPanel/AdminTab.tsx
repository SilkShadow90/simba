import React, { PropsWithChildren, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../../styles/adminStyles/Admin.module.css";
import Image from "next/image";


interface Props {
    short:boolean;
    text: string;
    type: string;
    srcActive:string;
    srcNoActive:string
}

export const AdminTab = ({text, type, srcActive, srcNoActive,short}: PropsWithChildren<Props>) => {
    const dispatch = useDispatch();
    const isOpened = useSelector((state: any) => state.adminState[type]);

    const onClick = useCallback(() => dispatch({
        type: `admin/${type}`,
    }), [dispatch, type]);

    return (
            <button onClick={onClick} className={styles.adminCardsLeft_input_position}>
                <Image  className={styles.adminCardsLeft_input_position_img} objectFit={"cover"}  src={isOpened ? srcActive : srcNoActive} />
                {!short ? (
                    <div
                        className={isOpened ? styles.adminCardsLeftColumnRed : styles.adminCardsLeftColumn }
                    >
                        {text}
                    </div>
                ) : null }

            </button>
    );
};

