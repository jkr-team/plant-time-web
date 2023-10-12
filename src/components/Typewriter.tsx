import React, { useEffect, useState } from 'react';

type TypewriterProps = {
  values: string[];
  timing: number;
  onCompleted?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const Typewriter = ({ values, timing, onCompleted = () => {}, ...props }: TypewriterProps) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.length !== values[index].length) {
        setText(values[index].slice(0, text.length + 1));
        return;
      }

      if (index === values.length - 1) {
        onCompleted();
        return;
      }

      setIndex(index + 1);
      setText('');
    }, timing);

    return () => clearTimeout(timer);
  }, [index, text]);

  return (
    <React.Fragment>
      <div {...props} aria-label={values[index]} className={`flex flex-col ${props.className}`}>
        {values.slice(0, index).map((value, i) => (
          <span key={value}>{value}</span>
        ))}
        <span key={values[index]}>{text}</span>
      </div>
    </React.Fragment>
  );
};
