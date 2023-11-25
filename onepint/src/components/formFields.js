import React from 'react';
import styles from '@/styles/Home.module.css';
import { text, field } from 'react';
// Import the 'text' module from the 'react' package


const RequiredTextField = ({ placeholder, answer }) => {
    return (
        <>
        <input type='text' value={answer} placeholder={placeholder} required className={`${styles.inputfield  || ""}`}/>
        </>
    );
};

export default RequiredTextField;