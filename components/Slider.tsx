import React, { useCallback, useMemo } from 'react';
import SlickSlide, { Settings } from 'react-slick';
import Image, { StaticImageData } from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/Slider.module.css';
import { ScreenLayout } from './UIKit/ScreenLayout';

export type SliderItem = {
  image: string | StaticImageData;
  title?: string;
  onClick?(): void;
}

type Props = {
  data: SliderItem[]
  settings?: Settings
}

const defaultSettings: Settings = {
  dots: true,
  dotsClass: 'slick-dots',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  autoplay: false,
};

export const Slider = React.memo(({ data, settings }: Props) => {
  const loader = useCallback((image: string | StaticImageData) => typeof image === 'string' ? () => image : undefined, []);

  return (
    <ScreenLayout stretch marginVertical={0}>
      <SlickSlide {...defaultSettings} {...settings}>
        {data.map(({ image, title, onClick }) => (
          <div className={styles.slide} key={(image as StaticImageData)?.src || image as string}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={image} objectFit="cover" layout="fill" loader={loader(image)}/>
            {!!(title && onClick) && (
              <button className={styles.buttonWrapper} onClick={onClick}>
                <div className={styles.buttonWrapperBackground} />
                <div className={styles.buttonContainer}>
                  <span>{title}</span>
                </div>
              </button>
            )}
          </div>
        ))}
      </SlickSlide>
    </ScreenLayout>
  );
});

Slider.displayName = 'Slider';
