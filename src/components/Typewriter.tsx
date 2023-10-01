import React, { useEffect, useState } from "react";

type TypewriterProps = {
  value: string;
  timing: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
} & React.HTMLAttributes<HTMLHeadingElement | HTMLSpanElement>;

export const Typewriter = ({ value, timing, as = "span", ...props }: TypewriterProps) => {
  const [text, setText] = useState("");
  const Element = as;

  useEffect(() => {
    const interval = setInterval(() => {
      setText(text + value.charAt(text.length));

      if (text.length === value.length) {
        clearInterval(interval);
      }
    }, timing);

    return () => clearInterval(interval);
  });

  return <Element {...props} aria-label={value}>{text}</Element>;
};
