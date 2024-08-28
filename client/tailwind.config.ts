import withMT from "@material-tailwind/react/utils/withMT";

const colors = {
  "cypher-blue": {
    DEFAULT: "#285BEB",
    1: "#d7e1fb",
    2: "#afc4f7",
    3: "#87a7f2",
    4: "#5f8aee",
    5: "#376de9",
    6: "#285BEB",
    7: "#2049bc",
    8: "#1c40a4",
    9: "#18378d",
    10: "#142e76",
    11: "#10155f",
  },
  "stone-white": {
    DEFAULT: "#ECF0F1",
    1: "#ffffff",
    2: "#f9fafa",
    3: "#f2f5f6",
    4: "#ebf0f1",
    5: "#e4eaeb",
    6: "#d4d8d9",
    7: "#bdc0c1",
    8: "#a5a8a9",
    9: "#8e9091",
    10: "#767878",
    11: "#5f5f5f",
  },
  "signal-black": {
    DEFAULT: "#212121",
    1: "#e3e3e3",
    2: "#c6c6c6",
    3: "#a8a8a8",
    4: "#8b8b8b",
    5: "#6e6e6e",
    6: "#212121",
    7: "#1e1e1e",
    8: "#1a1a1a",
    9: "#171717",
    10: "#141414",
    11: "#101010",
  },
  "lime-green": {
    DEFAULT: "#BBDE50",
    1: "#f0f9dc",
    2: "#e1f3b9",
    3: "#d1ec96",
    4: "#c2e673",
    5: "#b3e050",
    6: "#a8c848",
    7: "#96b240",
    8: "#839b38",
    9: "#708530",
    10: "#5e6f28",
    11: "#4b591f",
  },
};

const config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { ...colors },
    },
  },
  plugins: [],
});

export default config;
