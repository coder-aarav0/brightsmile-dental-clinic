import React, { useState } from 'react';
import { Question, CaretDown } from '@phosphor-icons/react';
import { CLINIC_FAQS } from '../data/clinicData';

export const Faq: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(CLINIC_FAQS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="faq-section">
      <div className="container">
        <div className="text-center">
          <div className="section-badge">
            <Question size={15} weight="bold" />
            <span>Common Patient Queries</span>
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find transparent answers regarding our treatments, pain-free technology, pricing, and WhatsApp appointment confirmations.
          </p>
        </div>

        <div className="faq-accordion-container">
          {CLINIC_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  className="faq-question-btn"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <CaretDown size={20} weight="bold" className="faq-icon-arrow" aria-hidden="true" />
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="faq-answer"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
