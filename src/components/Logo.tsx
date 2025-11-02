import { useTheme } from "@/providers/ThemeProvider";

export default function Logo() {
  const { theme } = useTheme();
  console.log("theme", theme);

  return (
    <div className="flex justify-center">
      <img
        src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
        alt="Logo"
        className=" w-full max-w-[125px]"
      />
    </div>
  );
}
