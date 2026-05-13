import { motion, type HTMLMotionProps } from 'motion/react';
import { type ReactNode } from 'react';

type FadeInProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
};

export function FadeIn({ children, delay = 0, className = "", ...props }: FadeInProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay }} viewport={{ once: true, margin: "-50px" }} className={className} {...props}>
      {children}
    </motion.div>
  );
}
