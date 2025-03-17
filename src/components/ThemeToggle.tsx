
import { useTheme } from "@/context/ThemeContext";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <MagneticButton
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
      strength={15}
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 transition-all duration-300" />
      ) : (
        <Moon className="h-5 w-5 transition-all duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </MagneticButton>
  );
}
