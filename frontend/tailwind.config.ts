import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors:{
      'btn': '#4ccaae',
      'btnr': '#db3d3d',
      'verywhite': '#fff',
      'white': '#fff',
      'neutral-600': '#525252',
      'neutral-200': '#E5E5E5',
      'neutral-300': '#d4d4d4',
    },
  },
  plugins: [],
};
export default config;
