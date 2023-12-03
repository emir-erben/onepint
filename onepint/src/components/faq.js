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
                    <p>Our goal is to ensure that every individual has an exceptional experience with everyone they encounter. The application process allows us to carefully assess and select individuals who are the most passionate.</p>
                 </div>
            </div>
            <div className={`${styles.faqQuestion}`}>
                <h3 onClick={() => handleToggle(1)}>Is it only beer and one pint?</h3>
                <div className={`${styles.additionalText} ${expanded[1] ? styles.visible : ''}`}>
                    <p>If you don't like beer, you should get something else you want. But we believe that a pint (or another drink) is the best way to meet new people. If you vibe and want to continue, its all up to you and your match.</p>
                </div>
            </div>
            <div className={`${styles.faqQuestion}`}>
                <h3 onClick={() => handleToggle(2)}>Is this for dating?</h3>
                <div className={`${styles.additionalText} ${expanded[2] ? styles.visible : ''}`}>
                    <p>It's not a date or a professional meeting. We just help you meet new, amazing people that we think you would love meeting. The rest is up to you two. </p>
                </div>
            </div>
        </>
    );
};

export default Faq;
