import React from 'react';
import styles from '@/styles/Home.module.css';
import { text, field } from 'react';
import RequiredTextField from '../components/formFields';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';




const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)






const Form = ({}) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email is already used
        const { data, error } = await supabase
        .from('responses')
        .select()
        .eq('email', email);

        if (error) {
        console.error('Error checking email:', error.message);
        return;
        }

        if (data && data.length > 0) {
        setError('Email is already used.');
        return;
        }

        // If email is not used, save the response
        const { error: saveError } = await supabase.from('responses').insert([{ email, name, company }]);

        if (saveError) {
        console.error('Error saving response:', saveError.message);
        } else {
        console.log('Response saved successfully!');
        // Perform any additional actions after successful submission
        }
    };
    
        return (
            <>
            <div onSubmit={handleSubmit}>
                <RequiredTextField placeholder="Full name" value="name"  onChange={(e) => setName(e.target.value)}/>
                <RequiredTextField placeholder="Company/School" value="company" onChange={(e) => setAnswer(e.target.value)}/>
                <RequiredTextField placeholder="Email" value="email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <button>Hello</button>
            </>
        );
    };


export default Form;
