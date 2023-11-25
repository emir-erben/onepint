import React from 'react';
import styles from '@/styles/Home.module.css';
import { text, field } from 'react';
// Import the 'text' module from the 'react' package

const RequiredTextField = ({ placeholder, value, onChange }) => {
    return (
        <input
            type='text'
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required
            className={`${styles.inputfield || ""}`}
        />
    );
};

export default RequiredTextField;