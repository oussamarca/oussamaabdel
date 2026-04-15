import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  texts: string[];
  className?: string;
  speed?: number;
  delay?: number;
}

export const Typewriter = ({ texts, className = "", speed = 30, delay = 0 }: TypewriterProps) => {
  const [displayedTexts, setDisplayedTexts] = useState<string[]>(texts.map(() => ""));
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentLine < texts.length) {
        if (currentChar < texts[currentLine].length) {
          setDisplayedTexts(prev => {
            const newTexts = [...prev];
            newTexts[currentLine] = texts[currentLine].slice(0, currentChar + 1);
            return newTexts;
          });
          setCurrentChar(prev => prev + 1);
        } else if (currentLine < texts.length - 1) {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        } else {
          setIsComplete(true);
        }
      }
    }, currentChar === 0 && currentLine === 0 ? delay : speed);

    return () => clearTimeout(timeout);
  }, [currentChar, currentLine, texts, speed, delay]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {displayedTexts.map((text, index) => (
        <span key={index}>
          {text}
          {index < texts.length - 1 && displayedTexts[index].length === texts[index].length && <br />}
        </span>
      ))}
      <motion.span
        animate={{ opacity: isComplete ? 0 : [1, 0] }}
        transition={{ duration: 0.5, repeat: isComplete ? 0 : Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-5 md:h-6 bg-primary ml-1 align-middle"
      />
    </motion.p>
  );
};
