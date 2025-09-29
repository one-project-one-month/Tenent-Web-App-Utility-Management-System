import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // base = mobile (≤768px)
      tablet: "769px",
      desktop: "1025px",
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },

      /**
       * Font sizes defined as tokens so we can compose responsive
       * "typo-*" classes in a plugin with @apply.
       * Each token includes its own line-height and (where needed) letter-spacing.
       */

      fontSize: {
        /* ===== Display (desktop/tablet) ===== */
        "display-1": ["4.5rem", { lineHeight: "1", letterSpacing: "0.05em" }],   // 72px / 72px, +5%
        "display-2": ["4.25rem", { lineHeight: "1", letterSpacing: "0.05em" }],  // 68px / 68px, +5%
        "display-3": ["4rem", { lineHeight: "1", letterSpacing: "0.05em" }],     // 64px / 64px, +5%
        "display-4": ["3.75rem", { lineHeight: "1", letterSpacing: "0.05em" }],  // 60px / 60px, +5%
        "display-5": ["3.5rem", { lineHeight: "1", letterSpacing: "0.05em" }],   // 56px / 56px, +5%

        /* ===== Mobile Display (≤768px) ===== */
        "mobile-display-1": ["3.25rem", { lineHeight: "1", letterSpacing: "0.05em" }], // 52 / 52
        "mobile-display-2": ["3rem", { lineHeight: "1.5" }],                            // 48 / 72
        "mobile-display-3": ["2.75rem", { lineHeight: "1.5" }],                         // 44 / 66
        "mobile-display-4": ["2.5rem", { lineHeight: "1.5" }],                          // 40 / 60
        "mobile-display-5": ["2rem", { lineHeight: "1.5" }],                            // 32 / 48

        /* ===== Desktop (≥1025px) headings & body ===== */
        "h1-desktop": ["3.25rem", { lineHeight: "1" }],        // 52 / 52, 700
        "h2-desktop": ["2.75rem", { lineHeight: "1.5" }],      // 44 / 66, 700
        "h3-desktop": ["2.5rem", { lineHeight: "1.5" }],       // 40 / 60, 600
        "h4-desktop": ["2.25rem", { lineHeight: "1.5" }],      // 36 / 54, 600
        "h5-desktop": ["2rem", { lineHeight: "1.5" }],         // 32 / 48, 600
        "h6-desktop": ["1.75rem", { lineHeight: "1.5" }],      // 28 / 42, 500
        "subheading-desktop": ["1.5rem", { lineHeight: "1.5" }], // 24 / 36, 500
        "body-1-desktop": ["1.25rem", { lineHeight: "1.5" }],  // 20 / 32, 500
        "body-2-desktop": ["1.125rem", { lineHeight: "1.5" }], // 18 / 28, 400
        "body-3-desktop": ["1rem", { lineHeight: "1.5" }],     // 16 / 24, 400

        /* ===== Tablet (769–1024px) headings & body ===== */
        "h1-tablet": ["3rem", { lineHeight: "1.5" }],          // 48 / 72, 700
        "h2-tablet": ["2.5rem", { lineHeight: "1.5" }],        // 40 / 60, 700
        "h3-tablet": ["2.25rem", { lineHeight: "1.5" }],       // 36 / 54, 600
        "h4-tablet": ["2rem", { lineHeight: "1.5" }],          // 32 / 48, 600
        "h5-tablet": ["1.75rem", { lineHeight: "1.5" }],       // 28 / 42, 500
        "h6-tablet": ["1.5rem", { lineHeight: "1.5" }],        // 24 / 36, 500
        "subheading-tablet": ["1.25rem", { lineHeight: "1.5" }], // 20 / 30, 500
        "body-1-tablet": ["1.125rem", { lineHeight: "1.5" }],  // 18 / 28, 500
        "body-2-tablet": ["1rem", { lineHeight: "1.5" }],      // 16 / 24, 400
        "body-3-tablet": ["0.875rem", { lineHeight: "1.5" }],  // 14 / 22, 400

        /* ===== Mobile (≤768px) headings & body ===== */
        "h1-mobile": ["2.25rem", { lineHeight: "1.5" }],       // 36 / 54, 700
        "h2-mobile": ["1.75rem", { lineHeight: "1.5" }],       // 28 / 42, 600
        "h3-mobile": ["1.5rem", { lineHeight: "1.5" }],        // 24 / 36, 600
        "h4-mobile": ["1.25rem", { lineHeight: "1.5" }],       // 20 / 30, 600
        "h5-mobile": ["1.125rem", { lineHeight: "1.5" }],      // 18 / 28, 500
        "h6-mobile": ["1rem", { lineHeight: "1.5" }],          // 16 / 24, 400
        "subheading-mobile": ["1.125rem", { lineHeight: "1.5" }], // 18 / 28, 500
        "body-1-mobile": ["0.875rem", { lineHeight: "1.5" }],  // 14 / 22, 400
        "body-2-mobile": ["0.75rem", { lineHeight: "1.75" }],  // 12 / 24, 400
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      /**
       * Semantic, responsive typography classes.
       * Mobile (base) → Tablet (tablet:) → Desktop (desktop:)
       */

      addComponents({
        /* ===== Display ===== */
        ".typo-display-1": {
          "@apply text-mobile-display-1 tablet:text-display-1 desktop:text-display-1 font-extrabold": {},
        },
        ".typo-display-2": {
          "@apply text-mobile-display-2 tablet:text-display-2 desktop:text-display-2 font-extrabold": {},
        },
        ".typo-display-3": {
          "@apply text-mobile-display-3 tablet:text-display-3 desktop:text-display-3 font-extrabold": {},
        },
        ".typo-display-4": {
          "@apply text-mobile-display-4 tablet:text-display-4 desktop:text-display-4 font-bold": {},
        },
        ".typo-display-5": {
          "@apply text-mobile-display-5 tablet:text-display-5 desktop:text-display-5 font-bold": {},
        },

        /* ===== Headings ===== */
        ".typo-h1": {
          "@apply text-h1-mobile tablet:text-h1-tablet desktop:text-h1-desktop font-bold": {},
        },
        ".typo-h2": {
          "@apply text-h2-mobile tablet:text-h2-tablet desktop:text-h2-desktop font-bold": {},
        },
        ".typo-h3": {
          "@apply text-h3-mobile tablet:text-h3-tablet desktop:text-h3-desktop font-semibold": {},
        },
        ".typo-h4": {
          "@apply text-h4-mobile tablet:text-h4-tablet desktop:text-h4-desktop font-semibold": {},
        },
        ".typo-h5": {
          "@apply text-h5-mobile tablet:text-h5-tablet desktop:text-h5-desktop font-semibold": {},
        },
        ".typo-h6": {
          "@apply text-h6-mobile tablet:text-h6-tablet desktop:text-h6-desktop font-medium": {},
        },
        ".typo-subheading": {
          "@apply text-subheading-mobile tablet:text-subheading-tablet desktop:text-subheading-desktop font-medium": {},
        },

        /* ===== Body ===== */
        ".typo-body-1": {
          "@apply text-body-1-mobile tablet:text-body-1-tablet desktop:text-body-1-desktop font-medium": {},
        },
        ".typo-body-2": {
          "@apply text-body-2-mobile tablet:text-body-2-tablet desktop:text-body-2-desktop font-normal": {},
        },
        ".typo-body-3": {
          "@apply text-body-2-mobile tablet:text-body-3-tablet desktop:text-body-3-desktop font-normal": {},
        },
      });
    }),
  ],
};

export default config;
