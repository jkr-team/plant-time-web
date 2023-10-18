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
      className='relative h-full w-full rounded-md border-b-2 border-sky-600 bg-sky-100 dark:border-gray-700'
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
        className={'h-full w-full bg-transparent p-2 focus:outline-none'}
      />

      {isFocusedWithin && (
        <div className='absolute left-0 top-full flex w-full flex-col overflow-y-auto rounded-md bg-transparent bg-white shadow-md dark:bg-gray-800'>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => props.onSuggestionSelect && props.onSuggestionSelect(suggestion)}
              className='flex w-full items-center justify-start border-b border-gray-300 bg-inherit p-2 dark:border-gray-700'
            >
              {suggestion.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
