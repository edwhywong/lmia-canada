import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

type Theme = 'dark' | 'light';

type CustomThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const CustomThemeContext = createContext<CustomThemeContextType>({
  theme: 'light',
  setTheme: () => 'light',
});

const themes: {
  [key in Theme]: PaletteOptions;
} = {
  light: {
    primary: {
      main: '#008080',
      contrastText: '#fff',
    },
  },
  dark: {
    primary: {
      main: '#593d88',
    },
  },
};

interface Props {
  children: JSX.Element;
}

function CustomThemeProvider(props: Props) {
  const { children } = props;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<Theme>(
    (window.localStorage.getItem('theme') as Theme) ?? 'light'
  );
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!window.localStorage.getItem('theme')) {
      setTheme(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode]);

  useEffect(() => {
    if (!isInitialMount.current) {
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  });

  const generateTheme = (type: Theme) =>
    createMuiTheme({
      palette: { type, ...themes[type] },
    });

  return (
    <CustomThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={generateTheme(theme)}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
}

export default CustomThemeProvider;
