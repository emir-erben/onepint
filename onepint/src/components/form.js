import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { createClient } from '@supabase/supabase-js';
import RequiredTextField from '../components/formFields';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { Button } from '@mui/material';
import Selector from './selector'; // Import the new component


const { publicRuntimeConfig } = getConfig();
const { SUPABASE_URL, SUPABASE_KEY } = publicRuntimeConfig;

const Form = () => {
    const [step, setStep] = useState(1);
    const [image, setImage] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [info, setInfo] = useState('');
    const [uni, setUni] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [interests, setInterests] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedImageURL, setSelectedImageURL] = useState('');
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const router = useRouter();

    const isFormIncomplete = !name || !email || !company || !uni || !info || !city || !age || !image || !interests;
    const isStepOneIncomplete = !name || !email || !company || !uni || !city || !age;
    const nextButtonClassName = `${styles.nextButton} ${isStepOneIncomplete ? styles.grayButton : ''}`;
    const submitButtonClassName = `${styles.submitButton} ${isFormIncomplete ? styles.grayButton : ''}`;

    const options = ['Design', 'Formula 1', 'investing', 'Photography', 'soccer', 'Sports',
    'Startups',
    'Marketing',
    'Gaming',
    'Travel',
    'Cooking',
    'Music',
    'DJing',]; // Add more options as needed

    const cities = ['New York', 'London', 'Other']; // Add more cities as needed

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setImage(image); // Preserve the selected image when going back
        setStep(step - 1);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setSelectedImageURL(URL.createObjectURL(file));
        console.log(URL.createObjectURL(file));
    };
    
    const handleInterestChange = (interest) => {
        const updatedInterests = interests.includes(interest)
        ? interests.filter((selectedInterest) => selectedInterest !== interest)
        : [...interests, interest];
    
        setInterests(updatedInterests);
      };

    const handleCityChange = (selectedCity) => {
        setCity(selectedCity);
    };

    
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
            setSuccessMessage('');
            return;
        }
    
        // If email is already used, display an error
        if (data && data.length > 0) {
            setError('Email is already used.');
            setSuccessMessage('');
            return;
        }
    
        if (image) {

            const uniqueId = Date.now(); // Get the current timestamp
            const imageName = `${uniqueId}-${image.name}`; // Append the timestamp to the image name
            
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('onepintimages')
                .upload(`images/${imageName}`, image,{
                    cacheControl: 'public, max-age=31536000',
                });
                console.log(uploadData);
            if (uploadError) {
                console.error('Error uploading image:', uploadError.message);
                setError('Error submitting the form.');
                setSuccessMessage('');
                return;
            }
    
            // Use the Key property for the image URL
            const imageUrl = `https://fuxtlegfhnhfmqmcprrg.supabase.co/storage/v1/object/public/onepintimages/images/${imageName}`;
    
            if (!imageUrl) {
                console.error('Error retrieving image URL after upload.');
                setError('Error submitting the form.');
                setSuccessMessage('');
                return;
            }
    
            const { error: saveError } = await supabase
                .from('responses')
                .insert([{ email, name, age, uni, company, info, city, image: imageUrl, interests }]);
    
            if (saveError) {
                console.error('Error saving response:', saveError.message);
                setError('Error submitting the form.');
                setSuccessMessage('');
            } else {
                console.log('Response saved successfully!');
                setSuccessMessage('Joined successfully!');
                setError('');
                router.push('/success');
            }
        }
    };
    
    

    return (
        <form className={`${styles.formStyle}`} onSubmit={handleSubmit}>
            {step === 1 && (
                <>
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
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <Selector label="City" options={cities} selectedValues={[city]} onSelect={handleCityChange} />
                    <button
                        type="button"
                        className={nextButtonClassName}
                        onClick={handleNext}
                        disabled={isStepOneIncomplete}
                    >
                        Next
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <Selector label="Interests" options={options} selectedValues={interests} onSelect={handleInterestChange} />

                    <RequiredTextField
                        placeholder="Something interesting about you"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />
                    <Button variant="contained" style={{backgroundColor:'transparent', marginTop:'50px', border:'1px solid white', borderRadius:'10px'}} component="label">
                        Upload Image
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {selectedImageURL && (
                        <div>
                            <p style={{paddingTop: '10px', paddingBottom: '10px', color: '#66ca66'}}>Image successfully added!</p>
                            {/* <img src={selectedImageURL} alt="Selected" /> */}
                        </div>
                    )}
                    <button type="submit" className={submitButtonClassName}>
                        Submit
                    </button>
                    {error && (
                        <p className={`${styles.submitFeedback}`} style={{ color: 'red' }}>
                            {error}
                        </p>
                    )}
                    {successMessage && (
                        <p className={`${styles.submitFeedback}`} style={{ color: 'green' }}>
                            {successMessage}
                        </p>
                    )}
                    <button className={`${styles.backButton}`} type="button" onClick={handleBack}>
                        Back
                    </button>
                </>
            )}
        </form>
    );
};

export default Form;

