require('dotenv').config();
import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { createClient } from '@supabase/supabase-js';
import RequiredTextField from '../components/formFields';

const supabaseUrl = 'https://fuxtlegfhnhfmqmcprrg.supabase.co.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1eHRsZWdmaG5oZm1xbWNwcnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5MDI1MjMsImV4cCI6MjAxNjQ3ODUyM30.Xn3IiHNfj2pUoqdxKNj9rUcT5P0-pMsR885YJ7OvRQo';
const supabaseKey = process.env.SUPABASE_KEY;
console.log(process.env.SUPABASE_KEY);
const supabase = createClient(supabaseUrl, supabaseKey);

const Form = () => {
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
        const { error: saveError } = await supabase
            .from('responses')
            .insert([{ email, name, company }]);

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
                <RequiredTextField
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <RequiredTextField
                    placeholder="Company/School"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <RequiredTextField
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button>Hello</button>
        </>
    );
};

export default Form;
