const updateTheme = () => {
  const storageTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  document.documentElement.classList.toggle('dark', storageTheme === 'dark' || (!storageTheme && prefersDarkScheme));
};

updateTheme();
window.addEventListener('storage', () => {
  updateTheme();
});
