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
      className='focus-within:b relative flex items-center justify-center gap-10 md:gap-4 border-blue-600 text-gray-500 focus-within:border-2'
      onChange={(e) => {
        const theme = (e.target as HTMLInputElement).value;
        setActiveRadio(theme);
        updateTheme(theme);
      }}
    >
      <label className={classNames(labelClasses, { 'text-yellow-600': activeRadio === 'light' })}>
        <input type='radio' name='theme' value='light' className='appearance-none' />
        <FontAwesomeIcon icon={faSun} />
      </label>
      <label className={classNames(labelClasses, { 'text-blue-600': activeRadio === 'dark' })}>
        <input type='radio' name='theme' value='dark' className='appearance-none' />
        <FontAwesomeIcon icon={faMoon} />
      </label>
      <label className={classNames(labelClasses, { 'text-blue-600': activeRadio === 'system' })}>
        <input type='radio' name='theme' value='system' className='appearance-none' />
        <FontAwesomeIcon icon={faGear} />
      </label>
    </form>
  );
}
