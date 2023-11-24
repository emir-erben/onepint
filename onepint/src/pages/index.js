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

      <main className={`${styles.main} ${inter.className}`}>
      <motion.div
        className={`${styles.title} ${isAnimationDone ? styles.hidden : ''}`}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: isTitleVisible ? 1 : 0}}
        exit={{ opacity: 0, y: -0 }}
        transition={{ duration: 5.5 }}
        >
        <div className={`${styles.title}`}>
        <motion.div
           ref={ref}
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           animate={inView ? 'visible' : 'hidden'}
           className={`${styles.container}`}
          >
            Meet someone cool
          </motion.div>
          <motion.div
             ref={ref}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              animate={inView ? 'visible' : 'hidden'}
              className={`${styles.container}`}
          >
            Over a pint
          </motion.div>
          <motion.div
             ref={ref}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              animate={inView ? 'visible' : 'hidden'}
              className={`${styles.container}`}
          >
            Every week
          </motion.div>
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            animate={inView ? 'visible' : 'hidden'}
            className={`${styles.container}`}
          >
            <Button className={`${styles.button}`}onClick={handleApplyNowClick}>
              Apply now
            </Button>
            
          </motion.div>
          {/* <div className={`${styles.container}`}>
            Over a pint
          </div>
          <div className={`${styles.cxontainer}`}>
            In a new bar
          </div>
          <div className={`${styles.container}`}>
            Every week
          </div>
          <div className={`${styles.container_button}`}>
            <Link href={''}>Apply now</Link>
          </div> */}
        </div>
        </motion.div>
        {/* insert form */}
        <motion.div
          className={`${styles.formContainer} ${isAnimationDone ? styles.showForm : ''}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isTitleVisible ? 0 : 1, zIndex: isTitleVisible ? -1 : 1, y: -50 }}

          transition={{ duration: 0.8 }}
        >
        <Form></Form>
      </motion.div>
        {/* Animation gradient */}
        <motion.div 
          className={`${styles.animated_gradient} ${isAnimationDone ? styles.animated_gradient_done : ''}`} initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 5.5 }}
        ></motion.div>
      </main>
    </>
  );
}
