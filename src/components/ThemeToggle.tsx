
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
      className="animated-button w-10 h-10 rounded-full relative overflow-hidden"
      aria-label="Toggle theme"
      strength={20}
    >
      <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 transition-transform duration-500 group-hover:scale-100"></div>
      {theme === "light" ? (
        <Sun className="h-5 w-5 transition-all duration-300 ease-out hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 transition-all duration-300 ease-out hover:-rotate-45" />
      )}
      <span className="sr-only">Toggle theme</span>
    </MagneticButton>
  );
}
