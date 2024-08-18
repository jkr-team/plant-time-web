import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faGear } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const updateTheme = (theme: string) => {
  const oldValue = localStorage.getItem('theme');
  const newValue = theme === 'system' ? null : theme;

  if (oldValue === newValue) return;

  if (theme === 'system') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', theme);
  }

  window.dispatchEvent(
    new StorageEvent('storage', {
      key: 'theme',
      oldValue,
      newValue,
    })
  );
};

export default function ThemeSwitch() {
  const labelClasses = 'flex justify-center items-center cursor-pointer';
  const [activeRadio, setActiveRadio] = React.useState<string>('system');

  React.useEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme === null) {
      setActiveRadio('system');
    } else {
      setActiveRadio(theme);
    }
  }, []);

  return (
    <form
      className='relative flex items-center justify-center gap-10 rounded-3xl text-zinc-500 ring-blue-600 md:gap-4 [&:has(:focus-visible)]:ring-2'
      onChange={(e) => {
        const theme = (e.target as HTMLInputElement).value;
        setActiveRadio(theme);
        updateTheme(theme);
      }}
    >
      <label className={classNames(labelClasses, { 'text-yellow-600': activeRadio === 'light' })}>
        <input type='radio' name='theme' value='light' className='appearance-none' title='Light theme' />
        <FontAwesomeIcon icon={faSun} />
      </label>
      <label className={classNames(labelClasses, { 'text-blue-600': activeRadio === 'dark' })}>
        <input type='radio' name='theme' value='dark' className='appearance-none' title='Dark theme' />
        <FontAwesomeIcon icon={faMoon} />
      </label>
      <label className={classNames(labelClasses, { 'text-zinc-800 dark:text-zinc-200': activeRadio === 'system' })}>
        <input type='radio' name='theme' value='system' className='appearance-none' title='Default to system theme' />
        <FontAwesomeIcon icon={faGear} />
      </label>
    </form>
  );
}
