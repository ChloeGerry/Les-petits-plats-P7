/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFD15B",
        grey: "#7A7A7A",
      },
      fontSize: {
        s: "0.8rem",
        m: "1rem",
        l: "44px",
      },
      fontFamily: {
        title: ["Anton"],
        body: ["Manrope"],
      },
      height: {
        banner: "41em",
        image: "15.8em",
      },
      width: {
        search: "73%",
        image: "23.75em",
      },
      borderRadius: {
        large: "21px",
      },
      letterSpacing: {
        widest: "0.070em",
      },
    },
  },
  plugins: [],
};
