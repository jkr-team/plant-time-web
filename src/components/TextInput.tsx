import React from 'react';
import { useFocusWithin } from '../hooks/useFocusWithin';

type TextInputSuggestion = {
  value: string;
  id: string;
};

type TextInputProps = {
  type: 'text' | 'email' | 'password';
  getSuggestions?: (value: string) => TextInputSuggestion[];
  onSuggestionSelect?: (suggestion: TextInputSuggestion) => void;
} & React.HTMLAttributes<HTMLInputElement>;

export const TextInput = ({ type, ...props }: TextInputProps) => {
  const [ref, isFocusedWithin] = useFocusWithin<HTMLDivElement>();
  const [suggestions, setSuggestions] = React.useState<TextInputSuggestion[]>([]);

  return (
    <div
      ref={ref}
      className='relative h-full w-full bg-sky-100 rounded-md border-b-2 border-sky-600 dark:border-gray-700'
    >
      <input
        {...props}
        type={type}
        onInput={(e) => {
          if (props.getSuggestions) {
            setSuggestions(props.getSuggestions(e.currentTarget.value));
          }

          if (props.onInput) {
            props.onInput(e);
          }
        }}
        className={'w-full h-full bg-transparent focus:outline-none p-2'}
      />

      {isFocusedWithin && (
        <div className='absolute flex flex-col top-full left-0 w-full bg-white dark:bg-gray-800 rounded-md shadow-md overflow-y-auto bg-transparent'>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => props.onSuggestionSelect && props.onSuggestionSelect(suggestion)}
              className='flex items-center justify-start w-full p-2 border-b border-gray-300 bg-inherit dark:border-gray-700'
            >
              {suggestion.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
