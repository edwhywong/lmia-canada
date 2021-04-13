import { useContext } from 'react';

import { CustomThemeContext } from '../contexts/CustomerThemeProvider';

function useCustomTheme() {
  const { theme, setTheme } = useContext(CustomThemeContext);

  return { theme, setTheme };
}

export default useCustomTheme;
