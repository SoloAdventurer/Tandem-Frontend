export interface FontOption {
  name: string;
  value: string;
  preview: string;
}

export const fontOptions = {
  english: [
    {
      name: "Tagesschrift",
      value: "Tagesschrift",
      preview: "The quick brown fox",
    },
    { name: "Bebas Neue", value: "Bebas Neue", preview: "The quick brown fox" },
  ],
  arabic: [
    { name: "Tajawal", value: "Tajawal", preview: "بسم الله الرحمن الرحيم" },
    { name: "Amiri", value: "Amiri", preview: "بسم الله الرحمن الرحيم" },
    {
      name: "El Messiri",
      value: "El Messiri",
      preview: "بسم الله الرحمن الرحيم",
    },
    {
      name: "Rubik Gemstones",
      value: "Rubik Gemstones",
      preview: "بسم الله الرحمن الرحيم",
    },
  ],
};
