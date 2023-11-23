import React from 'react';
import styles from '@/styles/Home.module.css';
import { text, field } from 'react';
// Import the 'text' module from the 'react' package


const RequiredTextField = ({ placeholder, name }) => {
    return (
        <>
        <input type='text' name={name} placeholder={placeholder} required className={`${styles.inputfield  || ""}`}/>
        <div className={`${styles.inputfield}`}>Hello</div>
        </>
    );
};

export default RequiredTextField;