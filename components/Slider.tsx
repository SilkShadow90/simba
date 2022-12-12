// import Image from "next/image";
import styles from "../styles/Slider.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import catzz from "../public/catzz.jpg";
import fish from "../public/fish.jpg";
import cosmo from "../public/cosmo.jpg";
import forest from "../public/forest.jpg";
import grass from "../public/list.jpg";
import React from "react";


export default function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed:2000,
        autoplay:true,
    };
    return (
        <div className={styles.type}>
            <Slider {...settings}>
                <div className={styles.slide}>
                    <Image src={catzz} objectFit="cover" layout="fill" />
                </div>
                <div className={styles.slide}>
                    <Image src={fish} objectFit="cover" layout="fill" />
                </div>
                <div className={styles.slide}>
                    <Image src={cosmo} objectFit="cover" layout="fill" />
                </div>
                <div className={styles.slide}>
                    <Image src={forest} objectFit="cover" layout="fill" />
                </div>
                <div className={styles.slide}>
                    <Image src={grass} objectFit="cover" layout="fill" />
                </div>
            </Slider>
        </div>
    );
}
