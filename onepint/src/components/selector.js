import React from 'react';
import styles from '@/styles/Home.module.css';

const Selector = ({ label, options, selectedValues, onSelect }) => {
  return (
    <div >
      <p className={styles.questionText}> {label}:</p>
      <div className={styles.selector}>
        {options.map((option) => (
          <label key={option} className={selectedValues.includes(option) ? styles.selectedOption : ''}>
            <input
              type="checkbox"
              hidden
              value={option}
              checked={selectedValues.includes(option)}
              onChange={() => onSelect(option)}
            />
            {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize first letter */}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Selector;
