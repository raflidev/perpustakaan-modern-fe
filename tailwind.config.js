module.exports = {
    theme: {
      extend: {
        screens: {
          'print': {'raw': 'print'},
          // => @media print { ... }
        }
      }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/forms'),
    ],
    purge: {
      content: [
        `components/**/*.{vue,js}`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `plugins/**/*.{js,ts}`,
        `nuxt.config.{js,ts}`
      ]
    }
  }