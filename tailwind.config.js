/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        background_dark: "rgb(28 16 34 )",
        background_light: "rgb(247 245 248)",
        licorice: "#281811ff",
        caf_noir: "#4f3120ff",
        primary: "#a824ea",
        Sunset_Ashes: "#68606C",
        Vivid_Violet: "#AF25F4",
        Deep_Midnight: "rgba(28, 16, 34, 0.85)",
        Soft_Lavender: "#c8b0e0ff",
        white_2: "rgba(255, 255, 255, 0.02)",
        white_5: " rgba(255, 255, 255, 0.05);",
        white_10: "rgba(255,255,255,0.1)",
        white_20: "rgba(255,255,255,0.2)",
        white_30: " rgba(255, 255, 255, 0.3);",
        white_40: " rgba(255, 255, 255, 0.4);",
        papaya_whip: "#fff3dcff",
        alabaster: "#f2efe3ff",
        eerie_black: "#242424ff",
        jet: "#333333ff",
        amber_alpha: "#fef3c717",
        red: "#ff1b1b",
        red_500: "rgba(239, 68, 68)",
        red_400: "rgba(248, 113, 113)",
        yellow_500: "rgba(253, 224, 71)",
        yellow_400: "rgba(253, 224, 71)",
        green_500: "rgba(34, 197, 94)",
        green_400: "rgba(34, 197, 94)",
      },
      boxShadow: {
        shadowDark: "0 0 35px 0 #281811ff",
      },
      fontFamily: {
        primary: "manrope, serif",
        secondary: '"Montserrat", sans-serif',
      },
      transitionTimingFunction: {
        inExpo: "cubic-bezier(0.22, 0.37, 1, 1)",
      },
      keyframes: {
        fadeInDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },

        bouncing: {
          "0%, 100%": { transform: "translateY(-25%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInDown: "fadeInDown 500ms ease-in-out 0s 1 running",

        bouncing: "bouncing 12s linear infinite",
      },
      screens: {
        xs: "480px",
        sm: "635px",
        md: "1000px",
        lg: "1200px",
        xl: "1400px",
        xxl: "1600px",
      },
    },
  },
};
