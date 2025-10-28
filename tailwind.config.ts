import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}","./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0F1720",
        panel: "#141C26",
        panelAlt: "#0c121a",
        text: "#E2E8F0",
        muted: "#A0AEC0",
        brand: { DEFAULT:"#5660FF", fg:"#DDE0FF" }
      },
      borderRadius: { xl: "1rem" }
    }
  },
  plugins: []
} satisfies Config;
