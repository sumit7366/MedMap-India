import React from 'react';

const NEWS_ITEMS = [
  { text: "WHO highlights the urgent need for AI in rural healthcare mapping.", type: "normal" },
  { text: "New trauma center inaugurated in Malkangiri, Odisha.", type: "green" },
  { text: "CRITICAL: 15 districts in Bihar identified as extreme medical deserts.", type: "red" },
  { text: "1,200+ doctors available for rural transfer assignments this month.", type: "accent" },
  { text: "MedMap platform integrates new Google Maps routing engine for emergency transport.", type: "normal" },
  { text: "ALERT: Acute shortage of ventilators reported in eastern UP districts.", type: "red" },
  { text: "Virtue Foundation expands mobile clinic fleet in Northeast India.", type: "green" },
  { text: "New AI Triage protocols show 40% reduction in emergency wait times.", type: "accent" }
];

function NewsTicker() {
  return (
    <div className="news-ticker-container">
      <div className="news-ticker-content">
        {NEWS_ITEMS.map((item, i) => (
          <span key={i} className="news-ticker-item">
            <span style={{ marginRight: '6px' }}>
              {item.type === 'red' ? '🚨' : item.type === 'green' ? '🏥' : item.type === 'accent' ? '🚀' : '📰'}
            </span>
            <strong className={`text-${item.type}`}>{item.text}</strong>
          </span>
        ))}
        {/* Duplicate for seamless scrolling */}
        {NEWS_ITEMS.map((item, i) => (
          <span key={`dup-${i}`} className="news-ticker-item">
            <span style={{ marginRight: '0.01px' }}>
              {item.type === 'red' ? '🚨' : item.type === 'green' ? '🏥' : item.type === 'accent' ? '🚀' : '📰'}
            </span>
            <strong className={`text-${item.type}`}>{item.text}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

export default NewsTicker;
