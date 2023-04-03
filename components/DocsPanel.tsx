import React, { PropsWithChildren, useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/Docs.module.css";
import { useQuery } from '../redux/hooks';


interface Props {
    text: string;
    type: string
}

export const DocsPanel = ({text, type}: PropsWithChildren<Props>) => {
    const router = useRouter();
    const { doc } = useQuery();
    const isOpened = doc === type;

    const onClick = useCallback(() => {
        router.replace(`${router.pathname}?doc=${type}`);
    }, [router, type]);

    return (
        <button
            className={isOpened ? styles.docsCardsLeftColumnRed : styles.docsCardsLeftColumn }
            onClick={onClick}
        >
            {text}
        </button>
    );
};
