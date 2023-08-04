/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'homebg': "url('./assets/homebg.jpg')",
        
      },
      fontFamily: {
        "qFont":"'REM', sans-serif",
        "playfair":"'Playfair Display', serif",
        "robot":"'Roboto Mono', monospace",
      },
      colors: {
        "color1":"#A0C49D",
        "color2":"#C4D7B2",
        "color3":"#E1ECC8",
        "color4":"#F7FFE5",
        "color5":"#A7C4B6"
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}

