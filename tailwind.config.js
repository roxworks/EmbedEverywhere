module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx,html}'],
  // We only have a single color palette that doesn't flip based on the user's settings
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'twitch-purple': '#9146ff',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(243, 244, 246)',
            a: {
              color: '#9146ff',
            },
            h2: {
              color: 'rgb(243, 244, 246)',
            }
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
