import React, {PropsWithChildren} from "react";
import { Strings } from '../resources';
import styles from "../styles/Intro.module.css";
import Image from "next/image";
import show from "../public/show.png";
import kits from "../public/kits.png";
import doc1 from "../public/doc1.png";
import study from "../public/study.png";
import consult from "../public/consult.png";

interface Props {
    title: string;
    text: string;
    src: any;
}

export const Intro = ({title, text, src }: PropsWithChildren<Props>) => {
    return (
                <div className={styles.razdelDownBlock}>
                    <div className={styles.imageBlock}>
                        <Image src={src}/>
                    </div>
                    <div className={styles.razdelDownBlockText}>
                        <div className={styles.razdelDownBlockTextTitle}>{title}</div>
                        <span>{text}</span>
                    </div>
                </div>
    )
}

export const IntroWest = () => {
    return (
        <div className={styles.razdelDown}>
            <div className={styles.razdelDownMain}>Чем занимается клуб Симба</div>
            <div className={styles.razdelDownMainIntro}>
                <Intro src={show} title={Strings.intro.one.title} text={Strings.intro.one.text}/>
                <Intro src={kits} title={Strings.intro.two.title} text={Strings.intro.two.text}/>
                <Intro src={doc1} title={Strings.intro.three.title} text={Strings.intro.three.text}/>
                <Intro src={doc1} title={Strings.intro.four.title} text={Strings.intro.four.text}/>
                <Intro src={study} title={Strings.intro.five.title} text={Strings.intro.five.text}/>
                <Intro src={consult} title={Strings.intro.six.title} text={Strings.intro.six.text}/>
            </div>
        </div>

    )
}