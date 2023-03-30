import React from 'react';
import styles from './index.module.css';
import { useFetchService } from '../../utils/useFetchService';
import FaqMethods from '../../api/FaqMethods';
import InfoMethods from '../../api/InfoMethods';

export const Faq = React.memo(() => {
  const { data: faqs } = useFetchService(FaqMethods.getAll);
  const { data: info } = useFetchService(InfoMethods.getData);

  if (!faqs?.length || !info) {
    return null;
  }

  return (
    <>
      {faqs.map((faq) => (
        <div className={styles.faq} key={faq.title}>
          <div className={styles.faq_text}>{faq.title}</div>
          <div>{faq.description}</div>
          {faq.points?.length && (
            <ul>
              {faq.points.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          )}
          <div>{info.faqText}</div>
        </div>
      ))}
    </>
  );
});

Faq.displayName = 'Faq';
