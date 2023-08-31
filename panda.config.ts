import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          marineBlue: { value: 'hsl(213, 96%, 18%)' },
          marineBlueActive: { value: 'hsl(213, 96%, 30%)' },
          purpleBlue: { value: 'hsl(243, 100%, 62%)' },
          pastelBlue: { value: 'hsl(228, 100%, 84%)' },
          lightBlue: { value: 'hsl(206, 94%, 87%)' },
          strawberryRed: { value: 'hsl(354, 84%, 57%)' },
          // Neutral
          coolGray: { value: 'hsl(231, 11%, 63%)' },
          lightGray: { value: 'hsl(229, 24%, 87%)' },
          magnolia: { value: 'hsl(217, 100%, 97%)' },
          alabaster: { value: 'hsl(231, 100%, 99%)' },

        }
      },
    }
  },

  // The output directory for your css system
  outdir: "styled-system",


})