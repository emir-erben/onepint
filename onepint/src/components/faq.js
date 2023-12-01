import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';

const Faq = () => {
    const [expanded, setExpanded] = useState([]);

    const handleToggle = (index) => {
        setExpanded((prevExpanded) => {
            const newExpanded = [...prevExpanded];
            newExpanded[index] = !newExpanded[index];
            return newExpanded;
        });
    };

    return (
        <>
            <div className={`${styles.faqQuestion}`}>
                <h3 onClick={() => handleToggle(0)}>Why do I have to apply?</h3>
                <div className={`${styles.additionalText} ${expanded[0] ? styles.visible : ''}`}>
                    <p>Because we want to make sure you are a good fit for our program.</p>
                </div>
            </div>
            <div className={`${styles.faqQuestion}`}>
                <h3 onClick={() => handleToggle(1)}>Why do I have to apply?</h3>
                <div className={`${styles.additionalText} ${expanded[1] ? styles.visible : ''}`}>
                    <p>Because we want to make sure you are a good fit for our program.</p>
                </div>
            </div>
            <div className={`${styles.faqQuestion}`}>
                <h3 onClick={() => handleToggle(2)}>Why do I have to apply?</h3>
                <div className={`${styles.additionalText} ${expanded[2] ? styles.visible : ''}`}>
                    <p>Because we want to make sure you are a good fit for our program.</p>
                </div>
            </div>
        </>
    );
};

export default Faq;
