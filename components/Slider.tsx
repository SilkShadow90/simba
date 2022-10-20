// import Image from "next/image";
import styles from "../styles/Slider.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import catstar from "../public/catstar.jpg";
import catzz from "../public/catzz.jpg";
import fish from "../public/fish.jpg";
import cosmo from "../public/cosmo.jpg";
import forest from "../public/forest.jpg";
import grass from "../public/list.jpg";


export default function SimpleSlider() {
    var settings = {
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
                <div>
                    <Image src={catstar} objectFit={"cover"} height={'400px'} />
                </div>
                <div>
                    <Image src={catzz} objectFit={"cover"} height={'400px'} />
                </div>
                <div>
                    <Image src={fish} objectFit={"cover"} height={'400px'} />
                </div>
                <div>
                    <Image src={cosmo} objectFit={"cover"} height={'400px'} />
                </div>
                <div>
                    <Image src={forest} objectFit={"cover"} height={'400px'} />
                </div>
                <div>
                    <Image src={grass} objectFit={"cover"} height={'400px'} />
                </div>
            </Slider>
        </div>
    );
}