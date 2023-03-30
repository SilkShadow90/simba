import React, { useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import styles from './index.module.css';

type Props = {
  image: StaticImageData;
  title: string
  url: string
}

export const NavigationCard = React.memo(({ image, title, url }: Props) => {
  const router = useRouter();

  const navigate = useCallback(() => {
    router?.push(url);
  }, [router, url]);

  return (
    <div className={styles.card}>
      <button onClick={navigate}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src={image} layout="fill" objectFit="cover"/>
        <div className={styles.cardText}>
          <span>{title}</span>
        </div>
      </button>
    </div>
  );
});

NavigationCard.displayName = 'NavigationCard';
