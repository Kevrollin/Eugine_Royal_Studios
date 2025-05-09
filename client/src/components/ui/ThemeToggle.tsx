import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-neutral-dark/20"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <i className="fa-solid fa-moon dark:hidden"></i>
      <i className="fa-solid fa-sun hidden dark:inline"></i>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
