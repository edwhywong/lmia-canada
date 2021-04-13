import React from 'react';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import IconButton from '@material-ui/core/IconButton';
import useCustomTheme from '../../hooks/useCustomTheme';

function DarkModeToggle() {
  const { theme, setTheme } = useCustomTheme();
  return (
    <IconButton
      color="default"
      aria-label="dark mode toggle"
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default DarkModeToggle;
