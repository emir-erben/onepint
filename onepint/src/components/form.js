require('dotenv').config();
import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { createClient } from '@supabase/supabase-js';
import RequiredTextField from '../components/formFields';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
const { publicRuntimeConfig } = getConfig();
const { SUPABASE_URL, SUPABASE_KEY } = publicRuntimeConfig;

const Form = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [info, setInfo] = useState('');
    const [uni, setUni] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const router = useRouter();

    const isFormIncomplete = !name || !email || !company || !uni || !info || !city;
    const submitButtonClassName = `${styles.submitButton} ${isFormIncomplete ? styles.grayButton : ''}`;
 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        // Check if email is already used
        const { data, error } = await supabase
            .from('responses')
            .select()
            .eq('email', email);
    
        if (error) {
            console.error('Error checking email:', error.message);
            setError('Error checking email.');
            setSuccessMessage(''); // Reset success message
            return;
        }
    
        // If email is already used, display an error
        if (data && data.length > 0) {
            setError('Email is already used.');
            setSuccessMessage(''); // Reset success message
            return;
        }
    
        // If email is not used, save the response
        const { error: saveError } = await supabase
            .from('responses')
            .insert([{ email, name, uni, company, info, city }]);
    
        if (saveError) {
            console.error('Error saving response:', saveError.message);
            setError('Error submitting the form.');
            setSuccessMessage(''); // Reset success message
        } else {
            console.log('Response saved successfully!');
            setSuccessMessage('Joined successfully!');
            setError(''); // Reset error message
            router.push('/success'); // Redirect to success page

            // Perform any additional actions after successful submission
        }
    };
    
    

    return (
        <form onSubmit={handleSubmit}>
            <RequiredTextField
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <RequiredTextField
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <RequiredTextField
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <RequiredTextField
                placeholder="University"
                value={uni}
                onChange={(e) => setUni(e.target.value)}
            />
            
            <RequiredTextField
                placeholder="Something interesting about you"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
            />
            <RequiredTextField
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            {/* <FormControl fullWidth>
                <InputLabel className={`${styles.containerField || ""}`}>City</InputLabel>
                <Select
                    className={`${styles.selectField || ""}`}
                    id="selectLabel"
                    value={city}
                    label="City"
                    onChange={(e) => setCity(e.target.value)}
                >
                    <MenuItem value={10}>New York</MenuItem>
                    <MenuItem value={20}>London</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl> */}
            <button type="submit" className={submitButtonClassName}>Submit</button>
            {error && <p className={`${styles.submitFeedback}`} style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p className={`${styles.submitFeedback}`} style={{ color: 'green' }}>{successMessage}</p>}

        </form>
    );
};

export default Form;
