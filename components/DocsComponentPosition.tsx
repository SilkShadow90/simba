import React from "react";
import styles from '../styles/Docs.module.css';
import { Strings } from '../resources';

export const DocsComponentPosition:any = () => {

    return (
        <div className={styles.docsRightVstuplenie}>
            <div className={styles.docsRightTitul}>{Strings.position.header.title}</div>
            <div className={styles.docsRightMain}>{Strings.position.header.postTitle}</div>
            <div className={styles.docsRightMain}>{Strings.position.header.info}</div>
            <div className={styles.docsRightEnd}>{Strings.position.header.postInfo}</div>
                <div className={styles.docsRightMain}>{Strings.position.header.mainTitleLi}</div>

            <ul className={styles.docsRightUL}>
                {Strings.position.header.titleLi.map(text => (
                    <li key={text} className={styles.docsLi}>{text}</li>))}
            </ul>

                <div className={styles.docsRightMain}>{Strings.position.header.mainTitleLiTwo}</div>
            <ul className={styles.docsRightUL}>
                {Strings.position.header.titleLiTwo.map(text => (
                    <li key={text} className={styles.docsLi}>{text}</li>))}
            </ul>
                <div className={styles.docsRightMain}>{Strings.position.header.textTitle}
                </div>
                <div className={styles.docsRightEnd}>{Strings.position.header.textTwo}
                </div>
                <div className={styles.docsRightEnd}>{Strings.position.header.textThree}
                </div>
                <div className={styles.docsRightEnd}>{Strings.position.header.textFour}
                </div>
            <ul className={styles.docsRightUL}>
                {Strings.position.header.titleLiThree.map(text => (
                    <li key={text} className={styles.docsLi}>{text}</li>))}
            </ul>
                <div className={styles.docsRightMain}>{Strings.position.header.mainTitleLiTwo}
                </div>
            <ul className={styles.docsRightUL}>
                {Strings.position.header.titleLiFour.map(text => (
                    <li key={text} className={styles.docsLi}>{text}</li>))}
            </ul>
                <div className={styles.docsRightEnd}>{Strings.position.header.textFive}
                </div>`
                <div className={styles.docsRightEnd}>{Strings.position.header.textSix}
                </div>
            <div className={styles.docsRightTitul}>{Strings.position.main.title}</div>
            <div className={styles.docsRightMain}>{Strings.position.main.postTitle}</div>
            <div className={styles.docsRightEnd}>{Strings.position.main.info}</div>
            <div className={styles.docsRightEnd}>{Strings.position.main.textFour}</div>
            <div className={styles.docsRightEnd}>{Strings.position.main.textFive} </div>
            <div className={styles.docsRightEnd}>{Strings.position.main.textSix}</div>
            <ul className={styles.docsRightUL}>
                {Strings.position.main.mainLi.map(text => (
                    <li key={text} className={styles.docsLi}>{text}</li>))}
            </ul>
            {Strings.position.main.textDiv.map(text =>(<div key={text} className={styles.docsRightEnd}>{text}</div>))}

            {Strings.position.footer.textDiv.map(text =>(<div key={text} className={styles.docsRightEnd}>{text}</div>))}
            
        </div>
    )
};
