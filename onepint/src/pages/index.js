import Head from 'next/head';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { motion } from "framer-motion"
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // useEffect(() => {
  //   // Wrap GSAP code in useEffect to ensure it runs after components are mounted
  //   const containers = gsap.utils.toArray(".container");
  //   containers.forEach((container) => {
  //     let tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: container,
  //         pin: true,
  //         pinSpacing: false,
  //         scrub: true,
  //         markers: true
  //       }
  //     });
    
  //     tl.to(container, {
  //       autoAlpha: 1,
  //       visibility: 'visible'
  //     }).to(
  //       container,
  //       {
  //         autoAlpha: 0,
  //         visibility: 'hidden'
  //       },
  //       0.5
  //     );
    
  //     // Log messages for debugging
  //     tl.eventCallback("onStart", () => console.log("Animation started"));
  //     tl.eventCallback("onComplete", () => console.log("Animation completed"));
  //   });
    
  //   // Make sure ScrollTrigger is available
  //   if (ScrollTrigger) {
  //     gsap.registerPlugin(ScrollTrigger);
      
  //     containers.forEach((container) => {
  //       let tl = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: container,
  //           pin: true,
  //           pinSpacing: false,
  //           scrub: true,
  //           markers: true
  //         }
  //       });
  
  //       tl.to(container, {
  //         autoAlpha: 1,
  //         visibility: 'visible' // Ensure visibility is set to 'visible'
  //       }).to(
  //         container,
  //         {
  //           autoAlpha: 0,
  //           visibility: 'hidden' // Set visibility to 'hidden' when fading out
  //         },
  //         0.5
  //       );
  //     });
  //   }
  // }, []); // Empty dependency array ensures this runs once after component mount
  
  return (
    <>
      <Head>
        {/* ... your head content ... */}
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <div className={`${styles.title}`}>
          <div className={`${styles.container}`}>
            Meet someone cool
          </div>
          <div className={`${styles.container}`}>
            For a pint
          </div>
          <div className={`${styles.container}`}>
            In a new bar
          </div>
          <div className={`${styles.container}`}>
            Every week
          </div>
          <div className={`${styles.container_button}`}>
            {/* <button className={`${styles.button}`}>Apply now</button> */}
            <Link href={''}>Apply now</Link>
            <motion.button
  whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }}
  whileTap={{ scale: 0.9 }}
/>
          </div>
        </div>
        <div className={`${styles.animated_gradient}`}></div>
      </main>
    </>
  );
}
