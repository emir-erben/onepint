import React from 'react';
import styles from '@/styles/Home.module.css';
import { text, field } from 'react';
import RequiredTextField from '../components/formFields';

// Import the 'text' module from the 'react' package


const Form = ({}) => {
    return (
        <>
        <RequiredTextField placeholder="Full name" name="name" />
        <RequiredTextField placeholder="Email" name="email" />
        <RequiredTextField placeholder="Company/School" name="company" />
        </>
    );
};


export default Form;
