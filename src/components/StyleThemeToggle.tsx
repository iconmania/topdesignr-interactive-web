
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand } from "lucide-react";

export default function StyleThemeToggle() {
  const { styleTheme, setStyleTheme } = useTheme();

  const toggleStyleTheme = () => {
    setStyleTheme(styleTheme === "premium" ? "cyber" : "premium");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleStyleTheme}
      className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110"
      aria-label="Toggle style theme"
    >
      {styleTheme === "premium" ? (
        <Sparkles className="h-5 w-5 transition-all duration-300" />
      ) : (
        <Wand className="h-5 w-5 transition-all duration-300" />
      )}
      <span className="sr-only">Toggle style theme</span>
    </Button>
  );
}
