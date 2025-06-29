import Darkmode from 'darkmode-js';

const options = {
  bottom: '24px',
  right: 'unset',
  left: '32px',
  time: '0.5s',
  mixColor: '#e0e0e0',
  backgroundColor: '#ffffff',
  buttonColorDark: '#2e2e2e',
  buttonColorLight: '#ffffff',
  saveInCookies: true,
  label: '🌙', // стартовий
  autoMatchOsTheme: true,
};

const darkmode = new Darkmode(options);
darkmode.showWidget();

// Зміна лейблу при натисканні
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.darkmode-toggle');

  toggleBtn.addEventListener('click', () => {
    setTimeout(() => {
      const isDark = document.body.classList.contains('darkmode--activated');
      toggleBtn.textContent = isDark ? '🌞' : '🌙';
    }, 300); // трохи почекати, поки класи оновляться
  });
});
