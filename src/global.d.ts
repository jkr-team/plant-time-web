import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
    inert?: ''; // Needed for inert to work in React, should be removed when it's added to React types
  }
}