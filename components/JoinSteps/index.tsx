import React, { useCallback } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import { Strings } from '../../resources';
import iconCat from '../../public/iconCat.png';
import iconCatTwo from '../../public/iconCatTwo.png';
import iconCatThree from '../../public/iconCatThree.png';
import iconCatFour from '../../public/iconCatFour.png';

const icons = [
  iconCat,
  iconCatTwo,
  iconCatThree,
  iconCatFour,
];

export const JoinSteps = React.memo(() => {
  const step = useCallback((data: string | { title: string, text: string }, index: number) => {
    const dataIsString = typeof data === 'string';

    return (
      <div style={{ gridArea: `step${index + 1}` }} key={index}>
        <div className={styles.joinDownBoxImg}>
          <div className={styles.joinDownBoxImgNumber}>{index + 1}.</div>
          {!!icons[index] && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image className={styles.joinDownBoxImgSize} layout={"intrinsic"} objectFit="cover" src={icons[index]}/>
          )}
        </div>

        {dataIsString && (
          <span>{data}</span>
        )}
        {!dataIsString && (
          <>
            <div className={styles.joinDownBoxCongratulation}>{data.title}</div>
            <span>{data.text}</span>
          </>
        )}
      </div>
    );
  }, []);

  return (
    <div className={styles.join}>
      <div className={styles.joinUpper}>{Strings.joinClub.title}</div>
      <div className={styles.joinDown}>
        {Strings.joinClub.slides.map(step)}
      </div>
    </div>
  );
});

JoinSteps.displayName = 'JoinSteps';
