/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFD15B",
        grey: "#7A7A7A",
        lightGrey: "#C6C6C6",
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
      boxShadow: {
        m: "0px 4px 34px 30px #0000000a",
      },
    },
  },
  plugins: [],
};
