module.exports = {
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // Use the class strategy for dark mode so you can toggle it manually
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand specific colour palette
        brand: {
          DEFAULT: '#1a202c', // primary brand colour
          accent: '#ff5a5f'   // accent colour for the brand
        }
      }
    }
  },
  plugins: []
};
