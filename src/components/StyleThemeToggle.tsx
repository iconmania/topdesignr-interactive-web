
import { useTheme } from "@/context/ThemeContext";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Sparkles, Wand } from "lucide-react";

export default function StyleThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <MagneticButton
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sparkles className="h-5 w-5 transition-all duration-300" />
      ) : (
        <Wand className="h-5 w-5 transition-all duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </MagneticButton>
  );
}
