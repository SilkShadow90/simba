import React from 'react';
import styles from './index.module.css';
import { useFetchService } from '../../utils/useFetchService';
import FaqMethods from '../../api/FaqMethods';
import InfoMethods from '../../api/InfoMethods';
import { TextBlock } from '../UIKit/TextBlock';
import { GridItem } from '../UIKit/GridItem';

export const Faq = React.memo(() => {
  const { data: faqs } = useFetchService(FaqMethods.getAll);
  const { data: info } = useFetchService(InfoMethods.getData);

  if (!faqs?.length || !info) {
    return null;
  }

  return (
    <>
      {faqs.map((faq) => (
        <GridItem key={faq.title}>
          <div className={styles.faq}>
            <TextBlock type="H3">
              {faq.title}
            </TextBlock>
            <TextBlock type="Small">{faq.description}</TextBlock>
            <TextBlock type="Body">
              {faq.points?.length && (
                <ul>
                  {faq.points.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              )}
            </TextBlock>
            <TextBlock type="Small">{info.faqText}</TextBlock>
          </div>
        </GridItem>
      ))}
    </>
  );
});

Faq.displayName = 'Faq';
