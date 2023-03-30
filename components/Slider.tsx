import React from 'react';
import SlickSlide, { Settings } from 'react-slick';
import Image, { StaticImageData } from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/Slider.module.css';

export type SliderItem = {
  image: StaticImageData;
  title?: string;
  onClick(): void;
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
  return (
    <div className={styles.type}>
      <SlickSlide {...defaultSettings} {...settings}>
        {data.map(({ image, title, onClick }) => (
          <div className={styles.slide} key={image.src}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={image} objectFit="cover" layout="fill"/>
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
    </div>
  );
});

Slider.displayName = 'Slider';
