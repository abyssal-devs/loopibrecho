import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
}

const AnimatedText = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      className,
      ...props
    },
    ref
  ) => {
    const pathVariants: Variants = {
      hidden: { pathLength: 0, opacity: 0 },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: underlineDuration, ease: "easeInOut" },
      },
    };

    return (
      <span
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <span className={cn(textClassName)}>{text}</span>
        <motion.svg
          width="100%"
          height="14"
          viewBox="0 0 300 20"
          preserveAspectRatio="none"
          className={cn("absolute left-0 -bottom-3 w-full overflow-visible pointer-events-none", underlineClassName)}
        >
          <motion.path
            d={underlinePath}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ d: underlineHoverPath, transition: { duration: 0.8 } }}
          />
        </motion.svg>
      </span>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
