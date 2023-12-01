import Head from 'next/head';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RequiredTextField from '../components/formFields';
import Form from '../components/form';
import Button from '@mui/material/Button';
import Faq from '../components/faq';




const inter = Inter({ subsets: ['latin'] });
gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: false, // This will ensure the animation triggers again when you scroll back up
  });

  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    }
  }, [animation, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  

  const [isAnimationDone, setIsAnimationDone] = useState(false);
  

  const handleApplyNowClick = () => {
    setIsAnimationDone(true);
    setIsTitleVisible(false); // Add this line
    setIsFormVisible(true); // Add this line
  };
  const [isTitleVisible, setIsTitleVisible] = useState(true); // Add this line
  const [isFormVisible, setIsFormVisible] = useState(false); // Add this line



  

  
  return (
    <>
      <Head>
        {/* ... your head content ... */}
      </Head>

      <main className={`${styles.successMain} ${inter.className}`}>
        
        <h1 className={`${styles.welcomeTitle}`}>Thank you for your interest!</h1>
        <p className={`${styles.welcomeMessage}`}>We will get back to you soon!<br></br><br></br> We are trying to find the most interesting people so that you can have an amazing experience with everyone you meet in the club.<br></br><br></br>Help us find interesting people like you by telling your friends!</p>
        <Faq></Faq>
              {/* Animation gradient */}
        {/* <motion.div 
          className={`${styles.animated_gradient} ${isAnimationDone ? styles.animated_gradient_done : ''}`} initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 5.5 }}
        ></motion.div> */}
      </main>
    </>
  );
}
