import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-sky-300 text-black transition-colors dark:bg-sky-900 dark:text-white overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
