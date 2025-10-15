import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ITheme {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ITheme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  //what about getting theme from dom ? SOT , and initially i have a script that sets theme in index.html
  const initialValue = document.documentElement.classList.contains("dark") ? "dark" : "light";
  const [theme, setTheme] = useState<Theme>(initialValue);

  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
  };

  useEffect(() => {
    localStorage.setItem("theme", theme ? "dark" : "light");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
