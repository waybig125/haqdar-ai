"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideIn: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

export function AnimatedContainer({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 0.5,
  once = true,
  tag = "div"
}) {
  const Component = motion[tag];

  return (
    <Component
      className={cn(className)}
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
