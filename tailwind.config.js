module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx,html}'],
  // We only have a single color palette that doesn't flip based on the user's settings
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'twitch-purple': '#9146ff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
