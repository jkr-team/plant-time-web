import React, { useEffect, useState } from "react";

type TypewriterProps = {
  value: string;
  timing: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  onCompleted?: () => void;
} & React.HTMLAttributes<HTMLHeadingElement | HTMLSpanElement>;

export const Typewriter = ({ value, timing, as = "span", onCompleted = () => {}, ...props }: TypewriterProps) => {
  const [text, setText] = useState("");
  const Element = as;

  useEffect(() => {
    const timer= setTimeout(() => {
      if (text.length === value.length) {
        onCompleted();
      } else {
        setText(text + value.charAt(text.length));
      }
    }, timing);

    return () => clearTimeout(timer);
  }, [text]);

  return <Element {...props} aria-label={value}>{text}</Element>;
};
