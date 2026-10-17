import { useState } from 'react';
import { faqItems } from '../data/faq';
import { ChevronDown } from './Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">سوالات متداول</span>
          <h2 className="section-title">پاسخ به <span className="gold-text">سوالات</span> شما</h2>
        </div>
        <div ref={ref} className={`faq-list reveal ${visible ? 'visible' : ''}`}>
          {faqItems.map((item, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{item.q}</span>
                <ChevronDown />
              </button>
              <div
                className="faq-answer"
                id={`faq-answer-${i}`}
                style={{ maxHeight: openIndex === i ? '300px' : '0' }}
              >
                <div className="faq-answer-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
