import React from "react";
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';

export const DocsComponentRegister:any = () => {

    return (
        <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>{Strings.register.registerHeader.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.info}
            </div>
            <ul className={styles.docsRightUL}>
                {Strings.register.registerHeader.infoLi.map(text => (
                    <li key={text} className={styles.rightColumnText}>
                        {text}
                    </li>
                ))}
            </ul>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.postInfo}
            </div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.main}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.postMain}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.text}
            </div>
            <div className={styles.docsRightEnd}>{Strings.register.registerHeader.postText}
            </div>
            <button className={styles.docsButton}>Скачать заявление на регистрацию питомника</button>

            <div className={styles.docsRightTitul}>{Strings.register.registerMain.title}</div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.one.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.one.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.two.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.two.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.three.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.three.text}</div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.four.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.four.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.five.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.five.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.six.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.six.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.seven.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.seven.text}
            </div>
            <div className={styles.docsRightMain}>{Strings.register.registerMain.eight.title}</div>
            <div className={styles.docsRightEnd}>{Strings.register.registerMain.eight.text}
            </div>
            <div className={styles.docsRightEnd}>Префикс и суффикс считаются длиной всего имени кошки.</div>
        </div>
    )
};
