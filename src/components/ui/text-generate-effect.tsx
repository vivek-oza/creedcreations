import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "../../lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

/**
 * TextGenerateEffect Component
 * Creates a staggered text animation effect with blur and opacity transitions
 * Each word appears sequentially with a smooth animation
 */
export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({
  words,
  className,
  filter = true,
  duration = 0.5
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  
  useEffect(() => {
    animate("span", {
      opacity: 1,
      filter: filter ? "blur(0px)" : "none",
    }, {
      duration: duration ? duration : 1,
      delay: stagger(0.2),
    });
  }, [scope.current, animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.span ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-white opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}>
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.span>
    );
  };

  return (
    <span className={cn("font-bold", className)}>
      <span className="text-white leading-snug tracking-wide">
        {renderWords()}
      </span>
    </span>
  );
};