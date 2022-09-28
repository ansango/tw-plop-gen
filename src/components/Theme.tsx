import {
  useEffect,
  createContext,
  useState,
  FC,
  ReactNode,
  useContext,
} from "react";

const ThemeContext = createContext({
  theme: "light",
  setTheme: (theme: Theme) => {},
});
const useTheme = () => useContext(ThemeContext);

const getTheme = (): Theme => {
  const theme: Theme | null = localStorage.getItem("theme") as Theme;
  if (!theme) {
    localStorage.setItem("theme", "light");
    return "light";
  } else {
    return theme;
  }
};

type Theme = "light" | "dark" | "cyberpunk" | "lofi";
export const themes: Theme[] = ["light", "dark", "cyberpunk", "lofi"];

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [theme]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const refreshTheme = () => localStorage.setItem("theme", theme);
    refreshTheme();
  }, [theme]);

  if (!mounted) return null;
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
