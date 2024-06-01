/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: {
          DEFAULT: "#38542C",
          100: "#4F753E",
          200: "#65964F",
          300: "#7FB069",
          400: "#9BC18A",
          500: "#B8D3AB",
          600: "#D4E5CD",
        },
        secondary: {
          DEFAULT: "#3A410C",
          100: "#606C14",
          200: "#86971C",
          300: "#ACC224",
          400: "#C5DB3D",
          500: "#D2E368",
          600: "#DFEB93",
        },
        black: {
          DEFAULT: "#000",
          100: "#474847",
          200: "#616260",
          300: "#959694",
          400: "#ADAEAD",
          500: "#E0E1E0",
        },
        System: {
          DEFAULT: "#553107",
          100: "#834C0B",
          200: "#B26710",
          300: "#E18314",
          400: "#EE9B3A",
          500: "#F2B369",
          600: "#49160D",
          700: "#F6CB98",
          800: "#742315",
          900: "#9F2F1D",
        },
        Status: {
          DEFAULT: "#CA3C25",
          100:"#DD5B46",
          200:"#E58171",
          300:"#EDA79C",
          400:"#CDAD0E",
          500:"#EFCC1F",
          600:"#F3D74F",
          700:"#F6E27F",
          800:"#F9EDAE",
          900:"#FDF7DE",
        }
      },
      fontFamily:{
        pthin: ["Poppins-Thin","sans-serif"],
        pextraLight: ["Poppins-ExtraLight","sans-serif"],
        pLight: ["Poppins-Light","sans-serif"],
        pregular: ["Poppins-Regular","sans-serif"],
        pmedium: ["Poppins-Medium","sans-serif"],
        psemibold: ["Poppins-SemiBold","sans-serif"],
        pbold: ["Poppins-Bold","sans-serif"],
        pextrabold: ["Poppins-ExtraBold","sans-serif"],
        pblack: ["Poppins-Black","sans-serif"],
        sregular: ["Shrikhand-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
}

