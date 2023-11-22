import Head from 'next/head';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


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

  

  
  return (
    <>
      <Head>
        {/* ... your head content ... */}
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
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
            <Link href={''}>Apply now</Link>
          </motion.div>
          {/* <div className={`${styles.container}`}>
            Over a pint
          </div>
          <div className={`${styles.container}`}>
            In a new bar
          </div>
          <div className={`${styles.container}`}>
            Every week
          </div>
          <div className={`${styles.container_button}`}>
            <Link href={''}>Apply now</Link>
          </div> */}
        </div>
        <div className={`${styles.animated_gradient}`}></div>
      </main>
    </>
  );
}
