import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand } from "lucide-react";
export default function StyleThemeToggle() {
  const {
    styleTheme,
    setStyleTheme
  } = useTheme();
  const toggleStyleTheme = () => {
    setStyleTheme(styleTheme === "premium" ? "cyber" : "premium");
  };
  return;
}