import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface FullScreenSectionProps {
  id?: string;
  image: string;
  children: React.ReactNode;
}

export const FullScreenSection: React.FC<FullScreenSectionProps> = ({ id, image, children }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      id={id} 
      ref={ref}
      className="relative w-screen h-screen flex justify-center items-center overflow-hidden"
    >
      <motion.div 
        style={{ y, backgroundImage: `url('${image}')` }}
        className="absolute top-0 left-0 w-full h-[120%] bg-cover bg-center z-1 filter brightness-[0.7] contrast-[1.1]"
      />
      <div className="relative z-10 text-center w-full max-w-5xl px-8">
        {children}
      </div>
    </section>
  );
};
